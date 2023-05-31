import { group } from 'console';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import PrimaryCTA from '../../../../components/buttons/CTA/PrimaryCTA'
import DarkInput from '../../../../components/buttons/DarkInput'
import UseInitialGroupState from '../../../../hooks/UseInitialGroupState';
import { Group } from '../../../../types/Group.type'
import { SubmitGroup } from '../functions/SubmitGroup';

interface GroupCreateProps {
	onGroupAdded : Function
}

function GroupCreate(props: GroupCreateProps) {

	const [currentGroup, setGroup] = useState<Group>(UseInitialGroupState());

  return (
    <div className='p-10 text-white flex flex-col gap-10'>
        <h2 className='font-normal text-2xl tracking-wide flex gap-2 items-center'>Add New Website Groups <span className='w-14 h-[2px] bg-white mt-1 bg-[#838992]'></span></h2>
		<div className='flex gap-5 items-end'>
			<DarkInput 
				type='text' 
				name='groupname' 
				label='Group name' 
				placeholder='Production'
				value={currentGroup.name}
				onChange={(value: string) => {
					setGroup({...currentGroup, name: value});
				}} 
			/>
			<div>
				<PrimaryCTA 
					label='Create new group' 
					text='text-[#161819]' 
					onClick={() => {
						const response = SubmitGroup(currentGroup);

						toast.promise(response, {
							loading: 'Creating group...',
							success: (group) => {
								props.onGroupAdded(group);
								currentGroup.name = '';
								return 'Group created !';
							},
							error: 'Error while creating a group',
						});
					}} 
				/>
			</div>
		</div>
		<div></div>
    </div>
  )
}

export default GroupCreate