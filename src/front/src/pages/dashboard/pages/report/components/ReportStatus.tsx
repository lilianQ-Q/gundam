import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

interface ReportStatusProps {
	backgroundColor: string;
	textColor: string;
	label: string;
	icon: JSX.Element;
}

function ReportStatus(props: ReportStatusProps) {
  return (
		<div className={`text-sm font-medium ${props.backgroundColor} ${props.textColor} px-5 p-1 rounded-full w-fit flex gap-2 items-center capitalize`}>
			{props.icon}
			{props.label}
		</div>
  )
}

export default ReportStatus