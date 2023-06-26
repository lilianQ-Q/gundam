import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import privateApi from '../../../../api/axiosapi'
import ActionButton from '../../../../components/buttons/ActionButton'
import CallToAction from '../../../../components/buttons/CallToAction'
import UseInitialSiteState from '../../../../hooks/UseInitialSiteState'
import { Site } from '../../../../types/Site.type'

function SiteList() {
	const [sites, setSites] = useState<Site[]>([]);

	const navigate = useNavigate();

	useEffect(() => {
		privateApi.get<Site[]>('/site/getall')
			.then((response) => {
				setSites(response.data);
			});
	}, []);

  return (
    <div className='flex flex-col gap-5'>
		<div className='flex justify-between'>
			<h2 className='font-normal text-2xl tracking-wide flex gap-2 items-center'>Sites <span className='w-14 h-[2px] mt-1 bg-[#ecedef]'></span></h2>
			<CallToAction label='View More' color='bg-[#161819] text-white'/>
		</div>
		<div>
			<table className='table-fixed w-full'>
				<thead className='text-left border-[1px] border-[#ecedef]'>
					<tr className='text-sm text-[#8e929a]'>
						<th className='p-3 font-normal'>Site</th>
						<th className='font-normal hidden md:table-cell'>Groups</th>
						<th className='font-normal'>Last Check</th>
						<th className='font-normal'>Actions</th>
					</tr>
				</thead>
				<tbody className='text-left border-[1px] border-[#ecedef]'>
					{
						sites.map((site, index) => {
							console.log(site.groups);
							return (
								<tr key={index} className='border-[1px] border-[#ecedef]'>
									<td className='p-3 font-semibold text-[#171719] text-sm'>{site.name}</td>
									<td className='text-sm font-normal text-[#737478] hidden md:table-cell'>{site.groups.length > 0 ? <span className='text-sm font-medium bg-green-200 text-green-600 px-5 p-1 rounded-full'>{site.groups[0].name}</span> : 'no groups'}</td>
									<td className='text-sm font-normal text-[#737478]'>{format(new Date(site.createdAt), 'd MMMM yyyy', {locale: fr})}</td>
									<td>
										<span>
											<ActionButton
												items={[
													{
														label: 'Update',
														onClick: () => {
															toast(`Trying to update site ${site.id}`)
														}
													},
													{
														label: 'Delete',
														onClick: () => {
															toast(`Trying to delete site ${site.id}`)
														}
													}
												]} 
											/>
										</span>
									</td>
								</tr>
							);
						})
					}
					
				</tbody>
			</table>
		</div>
	</div>
  )
}

export default SiteList