import React from 'react'
import PrimaryCTA from '../../../../components/buttons/CTA/PrimaryCTA'
import DarkInput from '../../../../components/buttons/DarkInput'

function GroupCreate() {
  return (
    <div className='p-10 text-white flex flex-col gap-10'>
        <h2 className='font-normal text-2xl tracking-wide flex gap-2 items-center'>Add New Website Groups <span className='w-14 h-[2px] bg-white mt-1 bg-[#838992]'></span></h2>
		<div className='flex gap-5 items-end'>
			<DarkInput type='text' name='groupname' label='Group name' placeholder='Production' />
			<div>
				<PrimaryCTA label='Create new group' text='text-[#161819]' onClick={() => {}} />
			</div>
		</div>
		<div></div>
    </div>
  )
}

export default GroupCreate