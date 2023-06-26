import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { fa0 } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	label?: string;
	icon?: IconProp;
}

function Input({ error, label, icon, ...inputProps }: InputProps) { 

	const [focus, setFocus] = useState<boolean>(false);

	return (
		<div className='flex flex-col gap-1'>
			<div className={`flex justify-between gap-2 items-center rounded-lg transition-all ${focus ? 'border-emerald-500 border-[2px] ring-2 ring-[#e3e5fa]' : ''} border-[1px] border-[#e7e6ea] p-2 px-5`}>
				<input {...inputProps} className='text-[#6e6e6e] placeholder:text-[#b3aeb0] w-full outline-0' onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
				<FontAwesomeIcon className={`${icon ? '' : 'hidden'}`} icon={icon ? icon : fa0} />
			</div>
			{error && <div>{error}</div>}
		</div>
	);
}

export default Input