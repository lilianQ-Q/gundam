import React from 'react'
import { Link } from 'react-router-dom'


function Header() {
	return (
		<div className='bg-[#161819] text-white p-5 flex justify-between px-10'>
			<h2 className='font-sembiold text-xl spacing-2 tracking-wider flex gap-2 items-center'>
				<img src={require('../../assets/gundamlogo.png')} alt="" className='shrink-0 w-6 h-6' />
				<span>gundam</span>
			</h2>
		</div>
	)
}

export default Header