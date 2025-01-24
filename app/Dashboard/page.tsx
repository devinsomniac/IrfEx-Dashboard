import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SalesReport from '@/components/SalesReport';

const page = () => {
  return (
    <div className=' px-4 py-5 md:p-3'>
      <Tabs defaultValue="Sales Report" className='border shadow-2xl rounded-2xl  md:w-full '>
        <TabsList className='flex justify-center'>
          <TabsTrigger className='text-[10px] md:text-[15px] font-bold' value="Sales Report">Sales Report</TabsTrigger>
          <TabsTrigger className='text-[10px] md:text-[15px] font-bold' value="Profitability Report">Profitability Report</TabsTrigger>
          <TabsTrigger className='text-[10px] md:text-[15px] font-bold' value="Heatmap">Heat Map</TabsTrigger>
        </TabsList>
        <TabsContent value="Sales Report"><SalesReport/></TabsContent>
        <TabsContent value="Profitability Report">Change your password here.</TabsContent>
        <TabsContent value="Heatmap">Change your password here.</TabsContent>
      </Tabs>

    </div>
  )
}

export default page
