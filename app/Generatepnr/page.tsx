"use client"
import React, { useState } from 'react'
import SelectAirlines from '@/components/SelectAirlines'
import { SelectArrAirport } from '@/components/SelectArrAirport'
import { SelectDepAirport } from '@/components/SelectDepAirport'
import Transit from '@/components/Transit'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from "@/components/ui/separator"

const page: React.FC = () => {
  const [passengers, setPassengers] = useState<string[]>([""]);

  const handleAddPassenger = (): void => {
    if (passengers.length < 9) {
      setPassengers([...passengers, ""]);
    }
  };

  const handlePassengerChange = (index: number, value: string): void => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = value;
    setPassengers(updatedPassengers);
  };

  return (
    <div className='p-16 flex flex-col items-center justify-center '>
      <h2 className='font-bold text-4xl p-3'>Ticket Generator</h2>
      <form action="" className='p-8 border border-black rounded-lg'>
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
        <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
        {passengers.map((passenger, index) => (
          <div key={index} className='my-2'>
            <label className='font-bold text-gray-600'>Passenger {index + 1} Name</label>
            <Input
              type='text'
              value={passenger}
              onChange={(e) => handlePassengerChange(index, e.target.value)}
              placeholder={`Enter Passenger ${index + 1} name with salutation`}
              className='w-[200px] md:w-[250px]'
            />
          </div>
        ))}
        </div>
        
        {passengers.length < 9 && (
          <Button
            type='button'
            className='bg-yellow-500 text-black font-bold rounded-full'
            onClick={handleAddPassenger}
          >
            +
          </Button>
        )}
        <Button type='submit' className='mt-4'>
          Generate
        </Button>
      </form>
    </div>
  )
}

export default page
