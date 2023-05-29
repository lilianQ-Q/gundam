import React, { useEffect, useState } from 'react'
import privateApi from '../../../../api/axiosapi';
import { Group } from '../../../../types/Group.type'

function GroupList() {

	const [groups, setGroups] = useState<Group[]>([]);

	useEffect(() => {
		privateApi.get<Group[]>('/group/getall')
			.then((response) => {
				if (response && response.status === 200)
					setGroups(response.data);
			})
	}, []);

  return (
	<div className='p-10 bg-white flex flex-col gap-10'>
		<h2 className='font-normal text-2xl tracking-wide flex gap-2 items-center'>
			All Websites Groups
			<span className='w-14 h-[2px] mt-1 bg-[#ecedef]'></span>
		</h2>
		<table className='table-fixed w-full'>
			<thead className='text-left border-[1px] border-[#ecedef]'>
				<tr className='text-sm text-[#8e929a]'>
					<th className='p-3 font-normal'>Group name</th>
					<th className='font-normal'>Used By</th>
					<th className='font-normal text-right px-5'>Action</th>
				</tr>
			</thead>
			<tbody className='text-left border-[1px] border-[#ecedef]'>
				{
					groups.length < 1 ? <td className='p-3 font-normal text-[#737478] text-sm'>No groups</td> : 

					groups.map((group) => {
						return (
							<tr className='border-[1px] border-[#ecedef]'>
								<td className='p-3 font-normal text-[#737478] text-sm'>{group.name}</td>
								<td className='text-sm font-semibold text-[#171719] table-cell'>{group.sites.length}</td>
								<td className='text-right px-5'>
									<span className='text-sm font-medium bg-green-200 text-green-600 px-5 p-1 rounded-full'>Routine</span>
								</td>
							</tr>
						);
					})						
				}
			</tbody>
		</table>	
	</div>
  )
}

export default GroupList