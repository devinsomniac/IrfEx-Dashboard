"use client"
import CustomerTable from '@/components/CustomerTable'
import { Input } from '@/components/ui/input'
import { db } from '@/Database'
import { passenger } from '@/Database/schema'
import React, { ChangeEvent, useEffect, useState } from 'react'

const page = () => {
  const [filterUserInput,setFilterUserInput] = useState("")
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterUserInput(e.target.value)
  }

  return (
    <div className='p-8'>
      <div className='p-2 border w-[370]'>
        <Input className='w-[350px]' placeholder='Search by Name' onChange={handleChange}/>
      </div>
      <div>
      <CustomerTable filterInput = {filterUserInput}/>
      </div>
    </div>
  )
}

export default page 
