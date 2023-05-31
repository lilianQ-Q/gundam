import { faEye } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import privateApi from '../../../../api/axiosapi'
import CallToAction from '../../../../components/buttons/CallToAction'
import DeletableCTA from '../../../../components/buttons/CTA/DeletableCTA'
import PrimaryCTA from '../../../../components/buttons/CTA/PrimaryCTA'
import DarkInput from '../../../../components/buttons/DarkInput'
import Input from '../../../../components/buttons/Input'
import Selector from '../../../../components/buttons/Selector'
import Footer from '../../../../components/common/Footer'
import Navbar from '../../../../components/common/Navbar'
import UseInitialSiteState from '../../../../hooks/UseInitialSiteState'
import { Group } from '../../../../types/Group.type'
import { Site } from '../../../../types/Site.type'
import GroupCreate from '../component/GroupCreate'
import GroupList from '../component/GroupList'
import { submitSite } from '../functions/SubmitSite'

const intervals: {id: number, label: string}[] = [
	{
		id: 0,
		label: 'None',
	},
	{
		id: 1,
		label: 'Minutes',
	},
	{
		id: 2,
		label: 'Hours',
	},
	{
		id: 3,
		label: 'Days',
	},
	{
		id: 4,
		label: 'Weeks',
	},
	{
		id: 5,
		label: 'Years',
	},
]

function CreateSite() {

	const [groups, setGroups] = useState<Group[]>([]);
	const [currentSite, setCurrentSite] = useState<Site>(UseInitialSiteState());

	const navigate = useNavigate();

	useEffect(() => {
		privateApi.get<Group[]>('/group/getall')
			.then((response) => {
				if (response && response.status === 200)
					setGroups(response.data);
			});
	}, []);

	function handleCreation()
	{
		const submitted = submitSite(currentSite);

		toast.promise(submitted, {
			loading: 'Creating site...',
			success: () => {
				return 'Site created !';
			},
			error: 'Error while trying to add a new site'
		});
	}

  return (
	<div className='flex flex-col'>
		<Navbar />

		<section className='p-10 bg-white flex flex-col gap-10'>

			<h2 className='font-normal text-2xl tracking-wide flex gap-2 items-center'>
				Add New Website To Check 
				<span className='w-14 h-[2px] mt-1 bg-[#ecedef]'></span>
			</h2>

			<div className='flex gap-10 flex-wrap'>

				<div className='flex flex-col w-[300px] gap-5'>

					<Input 
						type='text'
						name='name' 
						label='Site name' 
						value={currentSite.name} 
						placeholder='A site name' 
						onChange={(value: string) => currentSite.name = value}
					/>

					<Input 
						type='text' 
						name='url' 
						label='Website url'
						value={currentSite.url} 
						placeholder='https://example.com' 
						onChange={(value: string) => currentSite.url = value}
					/>

					<Selector 
						placeholder='When do I check vitals ?' 
						label='Check Interval' 
						value={currentSite.interval}
						items={intervals} 
						onClick={(id: number) => {
							const interval = intervals.find((ez) => ez.id === id);

							if (interval)
								setCurrentSite({
									...currentSite,
									interval: interval.label
								});
						}}
					/>

					<Input 
						type='text' 
						name='description' 
						label='Description'
						value={currentSite.description}
						placeholder='This website is my favorite api'
						onChange={(value: string) => currentSite.description = value}
					/>

					<PrimaryCTA label='Create New Website' onClick={handleCreation} />
				</div>

				<div className='flex flex-col gap-5'>
					<div className='w-[300px]'>

						<Selector 
							placeholder='Select related groups' 
							label='Website groups' 
							items={groups.map((element) => {
								return {
									id: element.id,
									label: element.name
								};
							})}
							onClick={(id: number) => {
								const group = groups.find((group) => group.id === id);

								if (group && !currentSite.groups.find((g) => g.id === group.id))
									setCurrentSite({
										...currentSite,
										groups: [...currentSite.groups, group]
									})
							}} 
						/>

					</div>
					<div className='flex gap-5 flex-wrap'>
						{
							currentSite.groups.map((element, index) => {
								return (
									<DeletableCTA 
										key={index} 
										label={element.name} 
										onClick={(label: string) => {
											setCurrentSite({
												...currentSite,
												groups: currentSite.groups.filter((group) => group.name !== label)
											})
										}} 
									/>
								);
							})
						}
					</div>
				</div>
			</div>
		</section>

		<GroupCreate 
			onGroupAdded={(group: Group) => {
				setGroups([...groups, group]);
		}} />

		<GroupList items={groups} />

		<Footer />
	</div>
  )
}

export default CreateSite