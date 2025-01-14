import { SelectArrAirport } from '@/components/SelectArrAirport'
import {SelectDepAirport} from '@/components/SelectDepAirport'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const page = () => {
  return (
    <div>
      <form action="" className='p-8'>
        <div className='flex justify-evenly items-center'>
          <div className='flex flex-col justify-start items-center'>
            <label>Select depurture Airport</label>
            <SelectDepAirport />
          </div>
          <div className='flex flex-col justify-start items-center'>
            <label>Select Arrival Airport</label>
            <SelectArrAirport />
          </div>

          <div>
            <label>Enter the Date of Booking</label>
            <Input type='date' className='w-[200px]' />
          </div>
          <div>
            <label>Enter the Date of Journey</label>
            <Input type='date' className='w-[200px]' />
          </div>
        </div>
        <Input type='text' placeholder='Enter the passenger name' />
        <Button>Generate</Button>
      </form>
    </div>
  )
}

export default page
