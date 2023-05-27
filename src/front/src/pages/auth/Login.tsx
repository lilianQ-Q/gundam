import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Footer from '../../components/common/Footer'
import Header from '../../components/common/Header'

function Login() {
	return (
		<>
			<Header />

			<section className='flex items-center flex-col gap-16 p-10 py-16 md:py-32 bg-[#161819] text-white min-h-full'>

				<div className='flex flex-col gap-5 items-center'>
					<h1 className='text-[40px] font-semibold text-center'>Login to Your Account</h1>
					<p className='text-[#868d97] text-center font-light'>Vérifiez la connectivité de tous vos sites web en temps réel <br /> et recevez vos rapports quotidiens.</p>
				</div>
				
				
				<div className='flex flex-col gap-5 w-[350px]'>
					<input type="text" className='px-5 p-3 bg-[#222222] rounded placeholder:text-[#6f6f6f] text-[#9ca3af]' placeholder='Gundam login' required/>
					<input type="password" name="" id="" className='px-5 p-3 bg-[#222222] rounded placeholder:text-[#6f6f6f] text-[#9ca3af]' placeholder='Your password goes here' required/>
					<div className='flex justify-between w-full bg-gradient-to-r from-[#34c29a] via-[#44c68d] to-[#e8cd70] rounded items-center px-5 p-3 text-[#161819]'>
						<input type="submit" value="Login to Your Account" className='font-medium'/>
						<FontAwesomeIcon icon={faArrowRight} color='#161819' />
					</div>
				</div>

			</section>

			<Footer />
		</>
	)
}

export default Login