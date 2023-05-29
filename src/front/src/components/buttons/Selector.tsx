import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

interface SelectorProps {
	items: {id: number, label: string}[],
	placeholder: string,
	onClick?: Function,
	value?: string,
	label?: string,
	selectedIndex?: number,
}

function Selector(props: SelectorProps) {
	const [openModal, setOpenModal] = useState(false); 

	function handleClick(id: number)
	{
		setOpenModal(!openModal);

		if (props.onClick)
			props.onClick(id);
	}

  return (
	<div className='flex flex-col gap-1 relative'>
		<span className={`${props.label ? '' : 'hidden'} text-[#000000]`}>{props.label}</span>
		<div className={`rounded-lg border-[1px] cursor-pointer transition-all ${openModal ? 'border-emerald-400 border-[2px] ring-2 ring-[#e3e5fa]' : 'border-[#e7e9e8]'} p-2 px-5 flex items-center justify-between`} onClick={() => setOpenModal(!openModal)}>
			<span className={`${props.value || props.selectedIndex ? 'text-[#898989]' : 'text-[#cac5c7]'} cursor-pointer`}>
				{
					props.selectedIndex ? props.items.at(props.selectedIndex)?.label : props.value ? props.value : props.placeholder
				}
			</span>
			<FontAwesomeIcon icon={faChevronDown} className={`cursor-pointer transition-all ${openModal ? 'rotate-180' : ''}`} />
		</div>
		<div className={`${openModal ? 'flex' : 'hidden'} w-full absolute z-10 top-20 border-[2px] bg-white border-[#eae9ed] rounded-lg p-2`}>
			<ul className='flex flex-col gap-1 w-full'>
			{
				props.items.map((element, index) => {
					return <li onClick={() => handleClick(element.id)} className='w-full px-5 rounded-lg py-2 font-normal hover:bg-[#f8f9fa] hover:font-semibold cursor-pointer' key={index}>{element.label}</li>
				})
			}
			</ul>
		</div>
	</div>
  )
}

export default Selector