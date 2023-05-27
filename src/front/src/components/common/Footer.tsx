import React from 'react'

function Footer() {
  return (
    <div className='w-full p-10 bg-[#161819] text-white font-light flex flex-col md:flex-row md:items-center gap-5 md:justify-around items-start'>
        <div className='flex flex-col gap-2 text-[#9a9ea4]'>
            <span>Created by <span className='font-semibold'>Bluelego</span></span>
            <span className='text-white'>Copyright {new Date().getFullYear()} @ Everate</span>
        </div>
        <div className='flex flex-col gap-2 text-[#9a9ea4]'>
            <span>Contact me</span>
            <span className='text-white'>contact.gundam@everate.fr</span>
        </div>
        <div className='flex flex-col gap-2 text-[#9a9ea4]'>
            <span>Links</span>
            <span className='text-white'>About Everate</span>
            <span className='text-white'>Questions</span>
            <span className='text-white'>Contact</span>
        </div>
    </div>
  )
}

export default Footer