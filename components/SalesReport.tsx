import Image from 'next/image'
import React from 'react'
import { FcSalesPerformance } from "react-icons/fc";
import { AiOutlineStock } from "react-icons/ai";
import { MdAirlines } from "react-icons/md";
import { MdAirplaneTicket } from "react-icons/md";
import { db } from '@/Database';
import { sql } from 'drizzle-orm';
import { pnr } from '@/Database/schema';
import {SalesChart} from './SalesChart';
import RecentBookingList from './RecentBookingList';


const SalesReport = async () => {
  const date = new Date()
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short", 
    day: "2-digit",   
    month: "short",   
    year: "numeric"   
};
const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  // Revenue for last 30 days
  const revenueResult = await db.select({
    revenue: sql<number>`SUM(${pnr.cost} + ${pnr.markup})`,
  })
    .from(pnr)
    .where(sql`TO_DATE(${pnr.dob},'YYYY-MM-DD')>= NOW() - INTERVAL '30 days'`)
  const revenue = revenueResult[0]?.revenue ?? 0
  // Sales for last 30 days
  const salesResult = await db.select({
    sales: sql<number>`COUNT(*)`
  })
    .from(pnr)
    .where(sql`TO_DATE(${pnr.dob},'YYYY-MM-DD') >= NOW() - INTERVAL '30 DAYS'`)
  const sales = salesResult[0]?.sales ?? 0
  //Most Airline
  const airlineResult = await db.select({
    airline: pnr.airlines,
    airline_image: pnr.airline_image,
    usageCount: sql<number>`COUNT(${pnr.airlines})`,
  })
    .from(pnr)
    .groupBy(pnr.airlines, pnr.airline_image)
    .orderBy(sql`COUNT(${pnr.airlines}) DESC`)
    .limit(1)
  const airline = airlineResult[0]


  const salesChartResult = await db
  .select({
    Month: sql<string>`TO_CHAR(TO_DATE(${pnr.dob}, 'YYYY-MM-DD'), 'Month') AS month`,
    Sales: sql<number>`COUNT(*) AS sales`,
  })
  .from(pnr)
  .where(
    sql`TO_DATE(${pnr.dob}, 'YYYY-MM-DD') >= CURRENT_DATE - INTERVAL '6 months'`
  )
  .groupBy(sql`TO_CHAR(TO_DATE(${pnr.dob}, 'YYYY-MM-DD'), 'Month')`)
  .orderBy(sql`MIN(TO_DATE(${pnr.dob}, 'YYYY-MM-DD'))`) 

console.log(salesChartResult);

const formatRevenue = (num : number) => {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toString();
};

  return (
    <div>
      <div className='px-5 flex justify-between items-center'>
          <h2 className='font-bold'>Summary Metrics</h2>
          <h2 className='p-1 bg-black text-white text-sm font-bold rounded-lg mb-2 shadow-xl'>{formattedDate}</h2>
        </div>
      <div className='flex flex-col md:flex-row p-4 gap-4 justify-evenly'>
        <div className=' shadow-xl rounded-xl p-4 md:w-[300px] hover:shadow-slate-600 border border-gray-500'>
          <div className=' gap-2 items-center'>
            <Image src={'/revenue.png'} alt='revenue' height={30} width={40} />
            <h2 className='font-bold text-gray-500'>Revenue Earned</h2>
          </div>
          <div className=' flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>BDT { formatRevenue(revenue)}</h1>
            <FcSalesPerformance className='text-4xl' />
          </div>
          <p className='font-bold text-sm text-gray-600'>For past 30 days</p>
        </div>
        <div className=' shadow-xl rounded-xl p-4 md:w-[300px] hover:shadow-slate-600 border border-gray-500'>
          <div className=' gap-2 items-center'>
            <MdAirplaneTicket className='text-blue-500 text-4xl' />
            <h2 className='font-bold text-gray-500'>Tickets Sold</h2>
          </div>
          <div className=' flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>{sales}</h1>
            <AiOutlineStock className='text-4xl text-green-500' />
          </div>
          <p className='font-bold text-sm text-gray-600'>For past 30 days</p>
        </div>
        <div className=' shadow-xl rounded-xl p-4 md:w-[300px] hover:shadow-slate-600 border border-gray-500'>
          <div className=' gap-2 items-center'>
            <MdAirlines className='text-red-600 text-4xl' />
            <h2 className='font-bold text-gray-500'>Most Used Airline</h2>
          </div>
          <div className=' flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>{airline.airline}</h1>
            <Image src={airline.airline_image || '/irfexlogo.png'} alt='airline logo' height={50} width={40} />
          </div>
          <p className='font-bold text-sm text-gray-600'>Uage Count {airline.usageCount}</p>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 p-4'>
        <div>
        <SalesChart chartData={salesChartResult}/>
        </div> 
        <div>
          <RecentBookingList/>
        </div>
      </div>
    </div>
  )
}

export default SalesReport
