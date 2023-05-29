import React from 'react'
import { Route, Routes } from 'react-router-dom';
import BackendAvailability from '../components/checker/BackendAvailability';
import Login from '../pages/auth/Login';
import Logout from '../pages/auth/Logout';
import DashboardHome from '../pages/dashboard/Home';
import CreateSite from '../pages/dashboard/pages/site/CreateSite';
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
			<BackendAvailability>
				<PrivateRoute>
					<DashboardHome />
				</PrivateRoute>
			</BackendAvailability>
	},
	{
		path: '/dashboard/site/add',
		element:
			<BackendAvailability>
				<PrivateRoute>
					<CreateSite />
				</PrivateRoute>
			</BackendAvailability>
	},
	{
		path: '/login',
		element:
			<PublicRoute>
				<Login />
			</PublicRoute>
	},
	{
		path: '/logout',
		element:
			<PublicRoute>
				<Logout />
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