import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SalesReport from '@/components/SalesReport';

const page = () => {
  const date = new Date()
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short", 
    day: "2-digit",   
    month: "short",   
    year: "numeric"   
};
const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
console.log(formattedDate)
  return (
    <div className='p-1 py-5 md:p-8 '>
      <div className='flex justify-end'>
      <h2 className='p-2 bg-black text-white font-bold rounded-lg mb-2 shadow-xl'>{formattedDate}</h2>
      </div>
      <Tabs defaultValue="Sales Report" className='border border-black w-[200px] md:w-full shadow-2xl'>
        <TabsList className='text-sm'>
          <TabsTrigger value="Sales Report">Sales Report</TabsTrigger>
          <TabsTrigger value="Profitability Report">Profitability Report</TabsTrigger>
          <TabsTrigger value="Customer Insights">Customer Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="Sales Report"><SalesReport/></TabsContent>
        <TabsContent value="Profitability Report">Change your password here.</TabsContent>
        <TabsContent value="Customer Insights">Change your password here.</TabsContent>
      </Tabs>

    </div>
  )
}

export default page
