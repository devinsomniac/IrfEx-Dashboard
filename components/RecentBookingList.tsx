import { db } from '@/Database';
import { passenger, pnr } from '@/Database/schema';
import { desc, eq, sql } from 'drizzle-orm';
import Image from 'next/image';
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
        .orderBy(sql`${pnr.doj} DESC`)

    console.log(recentResult);

    return (
        <div className="border p-2 rounded-lg overflow-y-auto h-[475px]">
            <h2 className="font-bold">Recent Bookings</h2>
            {recentResult.map((booking, index) => (
                <Link href={`Ticket/${booking.pnrData}`} key={index}>
                <div className="hover:bg-slate-400 flex justify-between border px-3 py-1 items-center">
                    <div className='flex gap-1 items-center'>
                    <div>
                        <Image src={'/avatar.jpg'} alt='avatar' height={50} width={60} className='rounded-full' />
                    </div>
                    <div>
                        <p className="font-semibold text-sm md:text-lg">{booking.passengerName}</p>
                        <p className="text-gray-600 text-sm md:text-lg">{booking.doj}</p>
                        <p className='text-sm md:text-lg'>{booking.destination}</p>
                    </div>
                    
                    </div>
                    
                    
                    <div className='rounded-md flex flex-col items-end'>
                        <p className="bg-slate-200 font-bold p-1 text-sm md:text-lg">{booking.pnrData}</p>
                        <p className='text-sm md:text-lg'>{booking.airlines}</p>
                    </div>
                    
                </div>
                </Link>
            ))}
        </div>
    );
};

export default RecentBookingList;
