import React from 'react'
import { Link } from 'react-router-dom';

interface CallToActionProps {
	callback?: Function;
	color?: string;
	label: string;
	href?: string;
}

function CallToAction(props: CallToActionProps) {
  return (
	<Link to={props.href ? props.href : '#'} >
		<div className={`p-2 px-4 text-[#161819] text-center ${props.color ? props.color : 'bg-white'}`}>
			{props.label}
		</div>
	</Link>
  )
}

export default CallToAction