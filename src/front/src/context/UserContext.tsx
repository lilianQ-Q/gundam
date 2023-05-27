import { useState, useEffect, createContext, PropsWithChildren } from 'react';
import privateApi from '../api/axiosapi';

type UserContextType = {
	email?: string,
	displayName?: string
};

export const UserContext = createContext<UserContextType>({});

const UserContextProvider = (props: PropsWithChildren<{}>) => {
  const [userData, setUserData] = useState({email: undefined, displayName: undefined});
  const [isLoading, setIsLoading] = useState(true);

  //TODO: Si network error redirect sur la login page
  useEffect(() => {
	privateApi.get('/auth/userinfo')
		.then((response) => {console.log(response); return response;})
		.then((response) => {
			if (response?.data)
				setUserData(response?.data);
		})
		.finally(() => setIsLoading(false));
  }, []);

  // Define the context value to be the user data state
  const contextValue: UserContextType = { displayName: userData.displayName, email: userData.email };

  // Render the provider component with the context value and any children
  return (
	<UserContext.Provider value={contextValue}>
	  {isLoading ? 'loading' : props.children}
	</UserContext.Provider>
  );
};

export default UserContextProvider;