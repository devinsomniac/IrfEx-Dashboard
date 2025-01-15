"use client"
import React, { ChangeEvent, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from './ui/input'

const Transit = () => {
    const [yes,setYes] = useState(false)
    const handleChange = (cheked : boolean) => {
        setYes(true)
    }
    return (
    <div className='flex flex-col justify-center items-start gap-2'>
        <label htmlFor='transit-yes' className='font-bold text-gray-600'>Is there any Transit ? </label>
        <Checkbox id='transit-yes' onCheckedChange={handleChange}/>
        {yes && 
        <div className='flex flex-col'>
        <label className='font-bold text-gray-600'>Enter the City for Transit </label>
        <Input/>
        </div>}
    </div>
  )
}

export default Transit
