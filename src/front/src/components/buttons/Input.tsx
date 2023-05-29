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

function Input(props: InputProps) {
	const [focus, setFocus] = useState(false);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>)
	{
		if (props.onChange)
			props.onChange(e.target.value);
	}

  return (
	<div className='flex flex-col gap-1'>
		<label className='px-1' htmlFor={props.name}>{props.label}</label>
		<div className={`flex justify-between gap-2 items-center rounded-lg transition-all ${focus ? 'border-emerald-500 border-[2px] ring-2 ring-[#e3e5fa]' : ''} border-[1px] border-[#e7e6ea] p-2 px-5`}>
			<input type={props.type} autoComplete='off' onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} name={props.name} placeholder={props.placeholder} onChange={handleChange} className='text-[#6e6e6e] placeholder:text-[#b3aeb0] w-full outline-0' />
			<FontAwesomeIcon className={`${props.icon ? '' : 'hidden'}`} icon={props.icon ? props.icon : fa0} />
		</div>
	</div>
  )
}

export default Input