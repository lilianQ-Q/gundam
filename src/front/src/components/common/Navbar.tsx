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
				<div className='w-8 h-8 bg-red-600 rounded-full relative bg-cover bg-center bg-no-repeat bg-[url("https://nextcloud.everate.fr/apps/files_sharing/publicpreview/nko475s6A5ioEye?file=&fileId=2326&x=1920&y=1080&a=true")]'></div>
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
		link: "#",
		isActive: true
	},
	{
		name: "Rapports",
		link: "#"
	},
	{
		name: "Sites",
		link: "#"
	},
	{
		name: "Paramètres",
		link: "#"
	}
]

function Navbar() {
  return (
	<div className='bg-[#161819] text-white p-5 flex justify-between px-10'>
		<h1 className='font-sembiold text-xl spacing-2 tracking-wider flex gap-2 items-center'>
			<div className='shrink-0'><img src={require('../../assets/gundamlogo.png')} alt="" className='shrink-0 w-6 h-6' /></div>
			<span>gundam</span>
		</h1>
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