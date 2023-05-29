import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import privateApi, { publicApi } from '../../api/axiosapi'
import Footer from '../../components/common/Footer'
import Header from '../../components/common/Header'

interface FormData {
	email: string,
	password: string
}

function Login() {

	const navigate = useNavigate();

	const [formData, setFormData] = useState<FormData>({
		email: "",
		password: "",
	});

	if(localStorage.getItem("access_token"))
        privateApi.get('/auth/userinfo').then(() => {
            navigate('/')}
        ).catch((error) => {
			console.log(error)
    	}); //TODO: Do this action before render

	function handleLogin(event: any)
	{
		event.preventDefault();

		const login = publicApi.post('/auth/local/signin', {
			email: formData.email,
			password: formData.password,
		}).catch((error) => {
			console.log(error);
			throw error;
		}).then((response) => {
			console.log(response);
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            navigate('/');
		});

		toast.promise(login, {
			loading: "Connexion...",
			success: "Yayyy bon retour parmis nous !",
			error: "Oh oh, impossible de se connecter.",
		});
	}

	function handleInputChange(event: any)
	{
		const { name, value } = event.target;
		setFormData((previous) => ({
			...previous,
			[name]: value
		}));
	}

	return (
		<div className='bg-[#161819] h-full'>
			<Header />

			<section className='flex items-center flex-col gap-16 p-10 py-16 md:py-32 bg-[#161819] text-white h-[750px]'>

				<div className='flex flex-col gap-5 items-center'>
					<h1 className='text-[40px] font-semibold text-center'>Login to Your Account</h1>
					<p className='text-[#868d97] text-center font-light'>Vérifiez la connectivité de tous vos sites web en temps réel <br /> et recevez vos rapports quotidiens.</p>
				</div>
				
				
				<div className='flex flex-col gap-5 w-[350px]'>
					<input type="text" name="email" onChange={handleInputChange} className='px-5 outline-0 p-3 bg-[#222222] rounded placeholder:text-[#6f6f6f] text-[#9ca3af]' placeholder='Gundam login' required/>
					<input type="password" name="password" onChange={handleInputChange} id="" className='px-5 p-3 outline-0 bg-[#222222] rounded placeholder:text-[#6f6f6f] text-[#9ca3af]' placeholder='Your password goes here' required/>
					<div onClick={handleLogin} className='flex justify-between w-full bg-gradient-to-r from-[#34c29a] via-[#44c68d] to-[#e8cd70] rounded items-center px-5 p-3 text-[#161819] cursor-pointer'>
						<input type="submit" value="Login to Your Account" className='font-medium cursor-pointer'/>
						<FontAwesomeIcon icon={faArrowRight} color='#161819' className='cursor-pointer' />
					</div>
				</div>

			</section>

			<Footer />
		</div>
	)
}

export default Login