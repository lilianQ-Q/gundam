import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { fa0 } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

interface InputProps {
	name: string,
	label?: string,
	type: string,
	value?: string,
	placeholder?: string,
	icon?: IconProp,
	onChange?: Function
}

function DarkInput(props: InputProps) {
	const [focus, setFocus] = useState(false);

  return (
	<div className='flex flex-col gap-1'>
		<label className='px-1 text-[#7c7c7c]' htmlFor={props.name}>{props.label}</label>
		<div className={`bg-[#1d1d1d] flex justify-between gap-2 items-center rounded-lg transition-all ${focus ? 'border-[2px] ring-2 ring-[#181818]' : ''} border-[1px] border-[#242424] p-2 px-5`}>
			<input type={props.type} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} name={props.name} placeholder={props.placeholder} onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange} autoComplete={'off'} className='text-[#959595] placeholder:text-[#4a494c] w-full outline-0 bg-transparent' />
			<FontAwesomeIcon className={`${props.icon ? '' : 'hidden'}`} icon={props.icon ? props.icon : fa0} />
		</div>
	</div>
  )
}

export default DarkInput