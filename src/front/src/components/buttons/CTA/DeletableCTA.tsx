import { faCross, faCrosshairs, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { CTAProps } from './CTAProps.type'

function DeletableCTA(props: CTAProps) {
  return (
	<div className={`bg-[#6ee7b8] ${props.text ? props.text : 'text-white'} relative rounded-lg font-normal flex items-center justify-center p-2 px-5 transition-all hover:ring-2 ring-emerald-200 cursor-pointer`}>
		<span className='absolute -top-2 -right-2 flex justify-center items-center w-6 h-6 rounded-full bg-emerald-400 cursor-pointer text-white'
			onClick={() => {
				props.onClick(props.label);
			}}
		>
			<FontAwesomeIcon icon={faXmark} />
		</span>
		<span>{props.label}</span>
	</div>
  )
}

export default DeletableCTA