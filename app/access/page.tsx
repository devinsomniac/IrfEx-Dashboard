import React from 'react'
import { BiSolidNoEntry } from "react-icons/bi";

const page = () => {
  return (
    <div className='h-[100vh] flex justify-center items-center gap-2 flex-col bg-slate-300'>
        <BiSolidNoEntry className='text-6xl text-red-600' />
        <h1 className='text-4xl'>Your Access Denied</h1>
    </div>
  )
}

export default page