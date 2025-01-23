import { db } from '@/Database'
import { passenger, pnr } from '@/Database/schema'
import { eq, sql } from 'drizzle-orm'
import React from 'react'

const RecentBookingList = async() => {
    const recentResult = await db
        .select(
            {
                passengerName: passenger.name,
                pnrData: pnr.pnrData,
                doj: pnr.doj
            }
        )
        .from(pnr)
        .innerJoin(passenger,eq(pnr.pnrData,passenger.pnr))
        .orderBy(sql`${pnr.dob} DESC`)
        .limit(10)   
    console.log(recentResult)  
  return (
    <div className='border p-2 rounded-lg'>
        <h2 className='font-bold'>Recent Bookings</h2>
      {recentResult.map((booking,index) => (
        <div key={index} className='flex justify-between border px-3 py-1 items-center'>
            <div>w
            <p className='font-semibold'>{booking.passenger.name}</p>
            <p className='text-gray-600'>{booking.pnr.doj}</p>
            </div>
            <div>
                <p className='font-bold'>{booking.pnr.pnrData}</p>
            </div>
        </div>
      ))}
    </div>
  )
}

export default RecentBookingList
