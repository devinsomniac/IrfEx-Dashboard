"use client"
import React, { ChangeEvent, useState } from 'react'
import SelectAirlines from '@/components/SelectAirlines'
import { SelectArrAirport } from '@/components/SelectArrAirport'
import { SelectDepAirport } from '@/components/SelectDepAirport'
import Transit from '@/components/Transit'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from "@/components/ui/separator"
import Image from 'next/image'
import PassengerList from '@/components/PassengerList'

const page = () => {
  const [depAir, setDepAir] = useState<{ name: string; address: string }>({ name: "", address: "" });
  const [arrAir,setArrAir] = useState<{name : string,address : string}>({name : "",address:""})
  const [dob,setDob] = useState("")
  const [doj,setDoj] = useState("")
  const [depTime,setDepTime] = useState("")
  const [arrTime,setArrTime] = useState("")
  const [airline,setAirline] = useState("")
  const [flightNo,setFlightNo] = useState("")
  const [transit,setTransit] = useState<{transit : boolean,place : string}>({transit : false,place : ""})
  const [flightDuration,setFlightDuration] = useState("")
  const [passengers,setPassengers] = useState([""])
  const handleDepAir = (airport : {name : string,address : string}) => {
    setDepAir(airport)
  }
  const handleArrAir = (airport : {name : string,address : string}) => {
    setArrAir(airport)
  }
  const handleDob = (e:ChangeEvent<HTMLInputElement>) => {
    setDob(e.target.value)
  }
  const handleDoj = (e:ChangeEvent<HTMLInputElement>) => {
    setDoj(e.target.value)
  }
  const handleDepTime = (e:ChangeEvent<HTMLInputElement>) => {
    setDepTime(e.target.value)
  }
  const handleArrTime = (e:ChangeEvent<HTMLInputElement>) => {
    setArrTime(e.target.value)
  }
  const handleAirline = (airline:string) => {
    setAirline(airline)
  }
  const handleFlightNumber = (e:ChangeEvent<HTMLInputElement>) => {
    setFlightNo(e.target.value)
  }
  const handleFlightDuration = (e:ChangeEvent<HTMLInputElement>) => {
    setFlightDuration(e.target.value)
  }
  const handleTransit = (transitInfo : {transit : boolean,place : string}) => {
    setTransit(transitInfo)
  }
  console.log(depAir)
  console.log(arrAir)
  return (
    <div className='p-12 flex flex-col items-center justify-center' style={{
      backgroundImage: `url('/bg.jpg')`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat', 
    }}>
      <Image src={'/banner.png'} alt='poster' width={700} height={100}/>
      <h2 className='font-bold text-4xl p-3'>Ticket Generator</h2>
      <form action="" className='p-8 border border-black rounded-lg bg-white'>
        <h3 className='font-semibold text-2xl my-1'>Flight Details</h3>
        <div className='grid grid-cols-1 md:grid-cols-4 justify-center gap-3'>
          <div className='flex flex-col'>
            <label className='font-bold text-gray-600'>Select Departure Airport</label>
            <SelectDepAirport onSelectDepAir = {handleDepAir} />
          </div>
          <div className='flex flex-col'>
            <label className='font-bold text-gray-600'>Select Arrival Airport</label>
            <SelectArrAirport onSelectArrAir = {handleArrAir} />
          </div>
          <div>
            <label className='font-bold text-gray-600'>Enter the Date of Booking</label>
            <Input type='date' className='w-[200px]' value={dob} onChange={handleDob}/>
          </div>
          <div>
            <label className='font-bold text-gray-600'>Enter the Date of Journey</label>
            <Input type='date' className='w-[200px]' value={doj} onChange={handleDoj} />
          </div>
          <div>
            <label className='font-bold text-gray-600'>Enter the Time of Departure</label>
            <Input type='time' className='w-[200px]' onChange={handleDepTime} />
          </div>
          <div>
            <label className='font-bold text-gray-600'>Enter the Time of Arrival</label>
            <Input type='time' className='w-[200px]' onChange={handleArrTime} />
          </div>
          <div className='flex flex-col'>
            <label className='font-bold text-gray-600'>Select Airlines</label>
            <SelectAirlines onSelectAirline = {handleAirline} />
          </div>
          <div>
            <label className='font-bold text-gray-600'>Enter Flight Number</label>
            <Input placeholder='Enter Flight Number' className='w-[200px]' onChange={handleFlightNumber} />
          </div>
          <div>
            <Transit handleTransitInfo = {handleTransit} />
          </div>
          <div>
            <label className='font-bold text-gray-600'>Flight Duration</label>
            <Input placeholder='Flight Duration' className='w-[200px]' onChange={handleFlightDuration} />
          </div>
        </div>
        <Separator className='my-2' />
        <h3 className='font-semibold text-2xl my-1'>Passenger Details</h3>
        <div>
          <PassengerList/>
        </div>
        <div className='flex justify-end'>
        <Button type='submit'>
          Generate
        </Button>
        </div>
      </form>
    </div>
  )
}

export default page
