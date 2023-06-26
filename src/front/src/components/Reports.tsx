import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import React, { useEffect, useState } from 'react'
import privateApi from '../api/axiosapi';
import { Report } from '../types/Report.type'
import CallToAction from './buttons/CallToAction'

interface ReportsWithFailedSiteCount extends Report
{
	failedSitesCount: number;
}

function Reports() {

	const [reports, setReports] = useState<ReportsWithFailedSiteCount[]>([]);

	useEffect(() => {
		privateApi.get<Report[]>('/report/getlastreports')
			.then((response) => {
				const reportsData = response.data;
				const reportsWithFailedSitesCount = reportsData.map((report) => ({
					...report,
					failedSitesCount: report.sites.filter((site) => site.status?.name === 'failed').length
				}));
				setReports(reportsWithFailedSitesCount);
			});
	}, []);

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
					{
						reports.map((element, index) => {
							return (
								<tr className='border-[1px] border-[#ecedef]' key={index}>
									<td className='p-3 font-normal text-[#737478] text-sm'>{format(new Date(element.createdAt), 'd MMMM yyyy', {locale: fr})}</td>
									<td className='text-sm font-semibold text-[#171719] hidden md:table-cell'>{element.sites.length}</td>
									<td className='text-sm font-semibold text-[#171719]'>{element.failedSitesCount}</td>
									<td>
										<span className='text-sm font-medium bg-green-200 text-green-600 px-5 p-1 rounded-full'>Routine</span>
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

export default Reports