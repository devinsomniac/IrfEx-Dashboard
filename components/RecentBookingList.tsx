import { db } from '@/Database';
import { passenger, pnr } from '@/Database/schema';
import { eq, sql } from 'drizzle-orm';
import Link from 'next/link';
import React from 'react';


type Booking = {
    pnrData: string;
    doj: string;
    dob: string; 
    passengerName: string;
    destination : string;
    airlines : string;
};

const RecentBookingList = async () => {
    const recentResult : Booking[] = await db
        .selectDistinct({
            pnrData: pnr.pnrData,
            doj: pnr.doj,
            dob: pnr.dob,
            destination : pnr.arrival_address,
            airlines : pnr.airlines,
            passengerName: sql<string>`(
                SELECT ${passenger.name}
                FROM ${passenger}
                WHERE ${passenger.pnr} = ${pnr.pnrData}
                LIMIT 1
            )`.as('passengerName'),
        })
        .from(pnr)

    console.log(recentResult);

    return (
        <div className="border p-2 rounded-lg overflow-y-auto h-[475px]">
            <h2 className="font-bold">Recent Bookings</h2>
            {recentResult.map((booking, index) => (
                <Link href={`Ticket/${booking.pnrData}`} key={index}>
                <div className="hover:bg-slate-400 flex justify-between border px-3 py-1 items-center">
                    <div>
                        <p className="font-semibold">{booking.passengerName}</p>
                        <p className="text-gray-600">{booking.doj}</p>
                        <p>{booking.destination}</p>
                    </div>
                    
                    <div className='rounded-md flex flex-col items-end'>
                        <p className="bg-slate-200 font-bold p-1">{booking.pnrData}</p>
                        <p>{booking.airlines}</p>
                    </div>
                    
                </div>
                </Link>
            ))}
        </div>
    );
};

export default RecentBookingList;
