import axios, { AxiosInstance } from "axios";

const privateApi: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
	"Content-Type": "application/x-www-form-urlencoded",
  },
  timeout: 5000
});

export const publicApi: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
	  "Content-Type": "application/x-www-form-urlencoded",
	},
	timeout: 5000
});

function addTimestamps(url: string) {
	const currentTimePrefix = url.indexOf('?') === -1 ? `?` : '&';
	const currentTimeArg = `${currentTimePrefix}timestamps=${new Date().getTime()}`;
	return `${url}${currentTimeArg}`;
}

function errorHandler(error: any) {
	const errorApi: AxiosInstance = axios.create({
		baseURL: process.env.REACT_APP_API_URL,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		}
	});

	if (error.response) {
	
		if (error.response.status === 401) {
	  		// Try to get new tokens and retry the original request
	  		const refreshToken = localStorage.getItem("refresh_token");
			console.log(refreshToken);
	  		if (refreshToken) {
				return errorApi.post("/auth/refresh", {}, {headers: {Authorization: `Bearer ${refreshToken}`}})
		  		.then(response => {
					console.log("Tokens refreshed");
					const { access_token, refresh_token } = response.data;
					localStorage.setItem("access_token", access_token);
					localStorage.setItem("refresh_token", refresh_token);
			
					// Retry the original request with the new tokens
					const config = error.config;
					config.headers.Authorization = `Bearer ${access_token}`;
					return privateApi.request(config).then((response) => {return response;});
		  		})
		  		.catch(error => {
					console.log("Error refreshing tokens", error.message);
					// Redirect to login page if the retry still results in a 401 error
					window.location.href = '/logout';
		  		});
	  		} else {
				console.log("No refresh token available");
				// Redirect to login page if no refresh token is available
				window.location.href = '/logout';
	  		}
		}
  	}

	// Log the error details
	console.log("Error details:", error.message, error.response);

	throw error;
}

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
	config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.url)
  	config.url = addTimestamps(config.url);
  return config;
});

privateApi.interceptors.response.use(
  (response) => response,
  (error) => {
	return errorHandler(error);
  }
);

export default privateApi;