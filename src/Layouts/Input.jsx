import React, { useRef, useState } from 'react'

const Input = ({label,...attributes}) => {
  const inputOne = useRef()
  
  const handleInput= ()=>{
    inputOne.current.style.bottom='38px'
    inputOne.current.style.background='rgb(203 213 225 / var(--tw-bg-opacity))' 
    inputOne.current.style.padding='10px 13px' 
    
  }

  return (
    <div className='relative'>
        <label htmlFor="" className='absolute left-[27px] bottom-[20px] text-[#11175D] font-[600] text-[13px] font-[nunito] transition-[5s] cursor-pointer' ref={inputOne} onClick={handleInput}>{label}</label>
        <input className='px-8 py-4  border-[1px] border-[#11175D] rounded-[8px] bg-slate-300 mt-[33px] w-full cursor-pointer' onClick={handleInput} {...attributes}/>
    </div>
  )
}

export default Input


