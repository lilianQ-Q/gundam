import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

interface StatCardProps {
    color?: string;
    label: string;
    value: string;
    icon: IconDefinition;
}

function StatCard(props: StatCardProps) {
  return (
    <div className='bg-[#242529] w-60 h-52 p-5 flex flex-col shrink-0 justify-between'>
        <div className='flex justify-between items-center'>
            <div className={`w-10 h-10 ${props.color ? props.color : 'bg-red-600'} flex items-center justify-center`}>
                <FontAwesomeIcon 
                    icon={props.icon}
                    color={'#2d2f30'}
                    size="lg"
                />
            </div>
            <span className='h-5 py-3 px-3 border-[1px] border-[#37383c] flex items-center justify-center font-semibold text-xs rounded-full text-[#b6d6c7]'>
                +24%
            </span>
        </div>
        <div className='flex flex-col gap-2'>
            <span className='uppercase text-[#9a9ea4] text-sm font-medium'>{props.label}</span>
            <span className='text-[40px]'>{props.value}</span>
        </div>
    </div>
  )
}

export default StatCard