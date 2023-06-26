import React, { useEffect, useState } from 'react'
import Input from '../../components/inputs/Input';
import PasswordInput from '../../components/inputs/PasswordInput';
import PassportInput from '../../components/inputs/PasswordInput'
import { ValueType } from '../../components/inputs/WithValidation';

function Test() {

    useEffect(() => {
        console.log('test');
    }, []);

  return (
    <div className='bg-white p-5 flex flex-col gap-10'>
        <span>hello</span>
    </div>
  )
}

export default Test