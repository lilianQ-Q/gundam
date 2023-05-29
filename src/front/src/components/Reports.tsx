import React from 'react'
import CallToAction from './buttons/CallToAction'

function Reports() {
  return (
	<div className='flex flex-col gap-5'>
		<div className='flex justify-between'>
			<h2 className='font-normal text-2xl tracking-wide flex gap-2 items-center'>Rapports <span className='w-14 h-[2px] mt-1 bg-[#ecedef]'></span></h2>
			<CallToAction label='View All' color='bg-[#161819] text-white'/>
		</div>
		<div>
			<table className='table-fixed w-full'>
				<thead className='text-left border-[1px] border-[#ecedef]'>
					<tr className='text-sm text-[#8e929a]'>
						<th className='p-3 font-normal'>Date</th>
						<th className='font-normal hidden md:table-cell'>Sites</th>
						<th className='font-normal'>Erreur</th>
						<th className='font-normal'>Tag</th>
					</tr>
				</thead>
				<tbody className='text-left border-[1px] border-[#ecedef]'>
					<tr className='border-[1px] border-[#ecedef]'>
						<td className='p-3 font-normal text-[#737478] text-sm'>29 Septembre 2023</td>
						<td className='text-sm font-semibold text-[#171719] hidden md:table-cell'>17</td>
						<td className='text-sm font-semibold text-[#171719]'>0</td>
						<td>
							<span className='text-sm font-medium bg-green-200 text-green-600 px-5 p-1 rounded-full'>Routine</span>
						</td>
					</tr>
					<tr className='border-[1px] border-[#ecedef]'>
						<td className='p-3 font-normal text-[#737478] text-sm'>29 Septembre 2023</td>
						<td className='text-sm font-semibold text-[#171719] hidden md:table-cell'>17</td>
						<td className='text-sm font-semibold text-[#171719]'>0</td>
						<td>
							<span className='text-sm font-medium bg-orange-200 text-orange-600 px-5 p-1 rounded-full'>Spontanée</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
  )
}

export default Reports