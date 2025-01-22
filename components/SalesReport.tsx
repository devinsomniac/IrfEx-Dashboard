import Image from 'next/image'
import React from 'react'
import { FcSalesPerformance } from "react-icons/fc";
import { AiOutlineStock } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";

const SalesReport = () => {
  return (
    <div>
      <div className='flex p-4 gap-3'>
        <div className='bg-slate-200 shadow-xl rounded-xl p-4 w-[300px] hover:shadow-2xl'>
          <div className=' gap-2 items-center'>
            <Image src={'/revenue.png'} alt='revenue' height={30} width={40} />
            <h2 className='font-bold text-gray-500'>Revenue Earned</h2>
          </div>
          <div className=' flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>BDT 25,000</h1>
            <FcSalesPerformance className='text-4xl' />

          </div>
        </div>
        <div className='bg-slate-200 shadow-xl rounded-xl p-4 w-[300px] hover:shadow-2xl'>
          <div className=' gap-2 items-center'>
            <Image src={'/ticket.png'} alt='revenue' height={30} width={65} />
            <h2 className='font-bold text-gray-500'>Tickets Sold</h2>
          </div>
          <div className=' flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>1,000</h1>
            <AiOutlineStock className='text-4xl text-green-500' />

          </div>
        </div>
        <div className='bg-slate-200 shadow-xl rounded-xl p-4 w-[300px] hover:shadow-2xl'>
          <div className=' gap-2 items-center'>
            <Image src={'/destination.png'} alt='revenue' height={30} width={65} />
            <h2 className='font-bold text-gray-500'>Most Visits</h2>
          </div>
          <div className=' flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>Bangalore</h1>
            <FaMapMarkerAlt className='text-4xl text-red-600' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesReport
