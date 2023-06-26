import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import privateApi from '../../../../api/axiosapi';
import Navbar from '../../../../components/common/Navbar'
import SkeletonSpan from '../../../../components/skeleton/SkeletonSpan';
import SkeletonTitle from '../../../../components/skeleton/SkeletonTitle';
import UseInitialReportState from '../../../../hooks/UseInitialReportState';
import { Report } from '../../../../types/Report.type';

function LoadingScreen() {

    return (
        <section className='p-10 bg-white flex flex-col gap-10 h-full'>
            <SkeletonTitle />
            <div className='flex flex-col gap-3'>
                <SkeletonSpan />
                <SkeletonSpan width={'w-32'} />
                <SkeletonSpan width={'w-20'} />
            </div>
        </section>
    );
}

function CreateReport() {

    const navigate = useNavigate();

    const [createdReport, setCreatedReport] = useState(UseInitialReportState());

    useEffect(() => {
        privateApi.post<Report>('/report/create').then((response) => {
            setCreatedReport(response.data);
        })
    }, []);

    useEffect(() => {
        if (createdReport.id !== 0)
            navigate(`/dashboard/report/${createdReport.id}`);
    }, [createdReport]);

    return (

        <div className='flex flex-col'>
            <Navbar />
            <LoadingScreen />
        </div>
    )
}

export default CreateReport