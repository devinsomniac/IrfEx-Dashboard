
import React from 'react'
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
  
  return (
    <div className='p-12 flex flex-col items-center justify-center' style={{
      backgroundImage: `url('/bg.jpg')`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat', 
    }}>
      <Image src={'/Indigo_ad.jpeg'} alt='poster' width={900} height={100}/>
      <h2 className='font-bold text-4xl p-3'>Ticket Generator</h2>
      <form action="" className='p-8 border border-black rounded-lg bg-white'>
        <h3 className='font-semibold text-2xl my-1'>Flight Details</h3>
        <div className='grid grid-cols-1 md:grid-cols-4 justify-center gap-3'>
          <div className='flex flex-col'>
            <label className='font-bold text-gray-600'>Select Departure Airport</label>
            <SelectDepAirport />
          </div>
          <div className='flex flex-col'>
            <label className='font-bold text-gray-600'>Select Arrival Airport</label>
            <SelectArrAirport />
          </div>
          <div>
            <label className='font-bold text-gray-600'>Enter the Date of Booking</label>
            <Input type='date' className='w-[200px]' />
          </div>
          <div>
            <label className='font-bold text-gray-600'>Enter the Date of Journey</label>
            <Input type='date' className='w-[200px]' />
          </div>
          <div>
            <label className='font-bold text-gray-600'>Enter the Time of Departure</label>
            <Input type='time' className='w-[200px]' />
          </div>
          <div>
            <label className='font-bold text-gray-600'>Enter the Time of Arrival</label>
            <Input type='time' className='w-[200px]' />
          </div>
          <div className='flex flex-col'>
            <label className='font-bold text-gray-600'>Select Airlines</label>
            <SelectAirlines />
          </div>
          <div>
            <label className='font-bold text-gray-600'>Enter Flight Number</label>
            <Input placeholder='Enter Flight Number' className='w-[200px]' />
          </div>
          <div>
            <Transit />
          </div>
          <div>
            <label className='font-bold text-gray-600'>Flight Duration</label>
            <Input placeholder='Flight Duration' className='w-[200px]' />
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
