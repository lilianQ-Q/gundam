import { faEllipsis, faListDots } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

interface ActionButtonElement {
	label: string;
	onClick: Function;
}

interface ActionButtonProps {
	items: ActionButtonElement[];
}

function ActionButton(props: ActionButtonProps) {

	const [showMenu, setShowMenu] = useState(false);

  return (
	<div className='relative'>
		<div className='flex items-center justify-center p-2 w-8 h-8 rounded-full bg-[#ecedef] cursor-pointer' 
			onClick={() => setShowMenu(!showMenu)}>
			<FontAwesomeIcon icon={faEllipsis} color='#959595' />
		</div>
		
		<div className={`flex-col w-32 min-h-[50px] max-h-[120px] bg-white border-2 border-[#ecedef] rounded-lg shadow-md absolute left-12 ${showMenu ? 'flex' : 'hidden'} top-0 p-2 items-center overflow-y-auto`}>
			<ul className='flex flex-col gap-2 w-full'>
				{
					props.items.map((item, index) => {
						return <li key={index} className='w-full transition hover:bg-[#ecedef] p-1 px-2 rounded-lg cursor-pointer' onClick={() => { item.onClick() }}>{item.label}</li>;
					})
				}
			</ul>
		</div>
	</div>
  )
}

export default ActionButton