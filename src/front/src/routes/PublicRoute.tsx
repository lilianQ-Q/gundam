import React from 'react'

interface PublicRouteProps {
	children: React.ReactNode
}

function PublicRoute(props: PublicRouteProps) {
	return (
		<>
			{props.children}
		</>
	)
}

export default PublicRoute