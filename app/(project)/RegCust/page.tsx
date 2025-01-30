"use client"
import CustomerTable from '@/components/CustomerTable'
import { Input } from '@/components/ui/input'
import React, { ChangeEvent } from 'react'

const Page = () => {
  const [filterUserInput,setFilterUserInput] = React.useState("")
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterUserInput(e.target.value)
  }

  return (
    <div className='p-8 border m-4'>
      <div className='p-2 border w-[370]'>
        <Input className='w-[350px]' placeholder='Search by Name' onChange={handleChange}/>
      </div>
      <div className='border'>
      <CustomerTable filterInput = {filterUserInput}/>
      </div>
    </div>
  )
}

export default Page 
