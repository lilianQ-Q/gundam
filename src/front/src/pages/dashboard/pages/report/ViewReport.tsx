import { faCheck, faCircleNotch, faCross, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import privateApi from '../../../../api/axiosapi';
import Navbar from '../../../../components/common/Navbar'
import UseInitialReportState from '../../../../hooks/UseInitialReportState';
import { Report } from '../../../../types/Report.type';
import ReportStatus from './components/ReportStatus';

const StatusElement = [
	{
		status: "success",
		element: <ReportStatus backgroundColor='bg-green-200' textColor='text-green-500' icon={<FontAwesomeIcon icon={faCheck} />} label="success" />
	},
	{
		status: "pending",
		element: <ReportStatus backgroundColor='bg-blue-200' textColor='text-blue-500' icon={<FontAwesomeIcon icon={faCircleNotch} spin />} label="pending" />
	},
	{
		status: "failed",
		element: <ReportStatus backgroundColor='bg-red-200' textColor='text-red-500' icon={<FontAwesomeIcon icon={faXmark} />} label="failed" />
	},
	
]

function ViewReport() {

	const { id } = useParams();
	const navigate = useNavigate();

	const [currentReport, setCurrentReport] = useState<Report>(UseInitialReportState());

	useEffect(() => {
		fetchReport();

		const interval = setInterval(fetchReport, 10000);

		return () => clearInterval(interval);
	}, [id])

	const fetchReport = () => {
		privateApi.get<Report>(`/report/get/${id}`)
			.then((response) => {
				console.log(response.data);
				setCurrentReport(response.data);
			}).catch(() => {
				toast.error("Unable to view this report");
				navigate('/');
			})
	}

  	return (
		<div className='flex flex-col'>
			<Navbar />
			<section className='p-10 bg-white flex flex-col gap-10'>
				<h2 className='font-normal text-2xl tracking-wide flex gap-2 items-center'>
					Autonomous Report N°{currentReport.id}
					<span className='w-14 h-[2px] mt-1 bg-[#ecedef]'></span>
				</h2>

				<div>
					<table className='table-fixed w-full'>
						<thead className='text-left border-[1px] border-[#ecedef]'>
							<tr className='text-sm text-[#8e929a]'>
								<th className='p-3 font-normal'>Site</th>
								<th className='font-normal hidden md:table-cell'>Groups</th>
								<th className='font-normal'>Last Check</th>
								<th className='font-normal'>Status</th>
							</tr>
						</thead>
						<tbody className='text-left border-[1px] border-[#ecedef]'>
							{
								currentReport.sites.map((reportSite, index) => {
									return (
										<tr key={index} className='border-[1px] border-[#ecedef]'>
											<td className='p-3 font-semibold text-[#171719] text-sm capitalize'>{reportSite.site?.name}</td>
											<td className='text-sm font-normal text-[#737478] hidden md:table-cell capitalize'>{reportSite.site && reportSite.site.groups.length > 0 ? <span className='text-sm font-medium bg-green-200 text-green-600 px-5 p-1 rounded-full'>{reportSite.site.groups[0].name}</span> : 'no groups'}</td>
											<td className='text-sm font-normal text-[#737478] capitalize'>{reportSite.site && format(new Date(reportSite.site.createdAt), 'd MMMM yyyy', {locale: fr})}</td>
											<td className='font-semibold text-[#171719] text-sm'>
												{
													StatusElement.map((element) => {
														console.log(reportSite.status?.name);
														console.log(element);
														return element.status === reportSite.status?.name ? element.element : null;
													})
												}
											</td>
										</tr>
									);
								})
							}
							
						</tbody>
					</table>
				</div>
			</section>
		</div>
  	)
}

export default ViewReport