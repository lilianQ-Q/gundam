import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

function Logout() {

	const navigate = useNavigate();

	useEffect(() => {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		
		toast.success("Déconnecté");
		navigate('/login');
	}, [navigate]);

	return (<></>);
}

export default Logout