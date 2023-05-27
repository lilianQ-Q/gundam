import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/auth/Login';
import DashboardHome from '../pages/dashboard/Home';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

interface RouteProps
{
	path: string;
	element: JSX.Element;
}

const routes : RouteProps[] = [
	{
		path: '/',
		element: 
			<PublicRoute>
				<DashboardHome />
			</PublicRoute>
	},
	{
		path: '/login',
		element:
			<PublicRoute>
				<Login />
			</PublicRoute>
	}
]

function Router() {
  return (
	<>
		<Routes>
			{
				routes.map((route, index) => {
					return <Route key={index} path={route.path} element={route.element} />
				})
			}
		</Routes>
	</>
  )
}

export default Router