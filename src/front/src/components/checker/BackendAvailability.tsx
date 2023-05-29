import React, { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import { publicApi } from '../../api/axiosapi';
import Logout from '../../pages/auth/Logout';
import Loading from '../common/Loading';

interface BackendAvailabilityProps {
	children: React.ReactNode;
}

function BackendAvailability(props: BackendAvailabilityProps) {

	const [backendAvailable, setBackendAvailable] = useState<boolean | null>(null);

	useEffect(() => {
		publicApi.get<string>('/ping')
			.then((response) => {
				setBackendAvailable(response.status === 200 && response.data === 'pong');
			})
			.catch(() => {
				setBackendAvailable(false);
			});
	}, []);

	if (backendAvailable === null)
		return <Loading />;

	if (!backendAvailable) {
		return <Logout />
	}

	return (
		<>
			{props.children}
		</>
	)
}

export default BackendAvailability;