import { faCalendarAlt, faPaperclip, faSitemap, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import '../../index.css';
import CallToAction from '../../components/buttons/CallToAction';
import Footer from '../../components/common/Footer';
import Navbar from '../../components/common/Navbar';
import Reports from '../../components/Reports';
import StatCard from '../../components/StatCard';

function Banner() {
	return (
		<div className='text-white flex flex-col gap-10 md:flex-row items-center border-b-2 border-[#2d2f30] py-10 justify-between'>
			<div className='flex gap-5 items-center'>
				<div className='w-16 h-16 bg-red-600 shrink-0 rounded-full bg-[url("https://nextcloud.everate.fr/apps/files_sharing/publicpreview/nko475s6A5ioEye?file=&fileId=2326&x=1920&y=1080&a=true")] bg-cover bg-right'></div>
				<div className='flex flex-col gap-2'>
					<span>Salut Lilian! 🤟🏻</span>
					<div className='text-[#868d96]'>J'espère que tout va bien et que tu passes une bonne journée.</div>
				</div>
			</div>
			<div className='flex flex-col gap-2 md:flex-row shrink-0'>
				<CallToAction label='Nouveau Site'/>
				<CallToAction label='Denier Rapport' color='bg-emerald-300'/>
			</div>
		</div>
	);
}

function Analytics() {
	return (
		<div className='text-white py-10 flex flex-col gap-10'>
			<div className='flex justify-between'>
				<h2 className='font-normal text-2xl tracking-wide flex gap-2 items-center'>Status <span className='w-14 h-[2px] bg-white mt-1 bg-[#838992]'></span></h2>
				<div className='flex gap-2 items-center border-[1px] border-[#2a2b30] p-2 px-5 text-sm font-light text-[#d6d7d9]'>
					<FontAwesomeIcon 
						icon={faCalendarAlt}
						color='#d6d7d9'
					/>
					<span>Today</span>
				</div>
			</div>
			<div className='flex justify-around flex-col md:flex-row gap-5 flex-wrap items-center'>
				<StatCard
					color='bg-blue-200'
					label='Total sites'
					value='7'
					icon={faSitemap}
				/>
				<StatCard
					color='bg-orange-200'
					label='Total errors'
					value='3'
					icon={faXmarkCircle}
				/>
				<StatCard
					color='bg-purple-300'
					label='Total reports'
					value='16'
					icon={faPaperclip}
				/>
			</div>
		</div>
	);
}

function DashboardHomeComponent() {
	return (
		<div className='flex flex-col'>
			<Navbar />
			<section className='flex flex-col p-10 px-20 bg-[#161819]'>
				<Banner />
				<Analytics />
			</section>
			<section className='flex flex-col p-10 px-20'>
				<Reports />
			</section>
			<section>
				<Footer />
			</section>
		</div>	
	);
}

function DashboardHome()
{
	return <DashboardHomeComponent />;
}

export default DashboardHome;