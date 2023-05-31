import { faBell, faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import React from 'react';

function ProfileArea() {
	return (
		<div className='flex items-center justify-center gap-5'>
			<FontAwesomeIcon 
				icon={faSearch}
				size="1x"
				color='#868d96'
			/>
			<div>
				<FontAwesomeIcon 
					icon={faBell}
					size="1x"
					color='#868d96'
				/>
			</div>
			<div className='flex gap-2 items-center justify-center'>
				<div className='w-8 h-8 bg-red-600 rounded-full relative bg-cover bg-center bg-no-repeat bg-[url("data:image/png;base64,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")]'></div>
				<FontAwesomeIcon 
					icon={faChevronDown}
					size="1x"
					color='#868d96'
				/>
			</div>
		</div>
	);
}

const NavbarMenuLinks = [
	{
		name: "Dashboard",
		link: "/",
		isActive: true
	},
	{
		name: "Rapports",
		link: "#"
	},
	{
		name: "Sites",
		link: "/dashboard/sites"
	},
	{
		name: "Paramètres",
		link: "#"
	}
]

function Navbar() {

  return (
	<div className='bg-[#161819] text-white p-5 flex justify-between px-10'>
		<Link to={'/'}>
			<h1 className='font-sembiold text-xl spacing-2 tracking-wider flex gap-2 items-center'>
				<div className='shrink-0'><img src={require('../../assets/gundamlogo.png')} alt="" className='shrink-0 w-6 h-6' /></div>
				<span>gundam</span>
			</h1>
		</Link>
		<div className='hidden md:flex'>
			<ul className='flex items-center flex-wrap justify-center gap-5'>
				{
					NavbarMenuLinks.map((element, index) => {
						return <Link key={index} to={element.link}><li className={`p-2 px-5 transition-all hover:bg-white hover:text-[#171719] ${element.isActive ? 'bg-white text-[#161819]' : ''}`}>{element.name}</li></Link>;
					})
				}
			</ul>
		</div>
		<ProfileArea />
	</div>
  )
}

export default Navbar