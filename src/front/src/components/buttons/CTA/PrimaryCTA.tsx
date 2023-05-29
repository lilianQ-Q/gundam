import React from 'react'
import { CTAProps } from './CTAProps.type'

function PrimaryCTA(props: CTAProps) {
	return (
		<div onClick={() => props.onClick()} className={`bg-[#6ee7b8] ${props.text ? props.text : 'text-white'} rounded-lg font-normal flex items-center justify-center p-2 px-5 transition-all cursor-pointer hover:ring-2 ring-emerald-100`}>
			{props.label}
		</div>
	)
}

export default PrimaryCTA