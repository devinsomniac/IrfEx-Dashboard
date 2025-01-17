"use client"
import React, { ChangeEvent, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from './ui/input'

const Transit = ({handleTransitInfo} : {handleTransitInfo : (transitInfo : {transit : boolean,place : string}) => void } ) => {
    const [yes,setYes] = useState(false)
    const [place,setPlace] = useState("")
    const handleChange = (checked : boolean) => {
        if(checked){
            setYes(true)
            handleTransitInfo({transit : yes,place : place})
        }else{
            setYes(false)
        }

    }
    const handlePlace = (e:ChangeEvent<HTMLInputElement>) => {
        setPlace(e.target.value)
    }
    return (
    <div className='flex flex-col justify-center items-start gap-2'>
        <label htmlFor='transit-yes' className='font-bold text-gray-600'>Is there any Transit ? </label>
        <Checkbox id='transit-yes' onCheckedChange={handleChange}/>
        {yes && 
        <div className='flex flex-col'>
        <label className='font-bold text-gray-600'>Enter the City for Transit </label>
        <Input onChange={handlePlace} placeholder='Enter Transit Place'/>
        </div>}
    </div>
  )
}

export default Transit
