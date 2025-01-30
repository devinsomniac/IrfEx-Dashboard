import React from 'react'
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FiTrendingUp } from "react-icons/fi";
import { CiPercent } from "react-icons/ci";
import { FaRoute } from "react-icons/fa6";
import { TbRouteAltLeft } from "react-icons/tb";
import { ProfitChart } from './ProfitChart';
import { ProfitByAirlines } from './ProfitByAirlines';
import { db } from '@/Database';
import { sql } from 'drizzle-orm';
import { pnr } from '@/Database/schema';

type ProfitChartData = {
    month : string,
    profit : number
}

type airlinesNumber = {
    airlines : string,
    number : number
}
const ProfitabilityReport = async () => {
    // Net Profit
    const ProfitResult = await db
        .select({
            profit: sql<number>`SUM (${pnr.markup})`
        })
        .from(pnr)
        .where(sql`TO_DATE(${pnr.dob},'YYYY-MM-DD') >= NOW() - INTERVAL '30 days'`)
    console.log("Result is ", ProfitResult[0])

    //Profit margin based on revenue
    const ProfitMargin = await db
        .select({
            TotalMargin: sql<number>`(SUM(${pnr.markup}) * 100.0) / SUM(${pnr.cost} + ${pnr.markup})`
        })
        .from(pnr)
        .where(sql`TO_DATE(${pnr.dob},'YYYY-MM-DD') >= NOW() - INTERVAL '30 days'`)
    const marginValue = ProfitMargin[0].TotalMargin;
    const formatMrgin = marginValue !== null && marginValue !== undefined
        ? Number(marginValue).toFixed(2) : "0.00";
    console.log("Margin is ", formatMrgin)

    //Most Visited City Till now
    const PopularCity = await db
        .select({
            place: sql<string>`${pnr.arrival_address}`,
            count: sql<number>`COUNT(${pnr.arrival_address})`
        })
        .from(pnr)
        .groupBy(sql`${pnr.arrival_address}`)
        .orderBy(sql`COUNT(${pnr.arrival_address}) DESC`)
        .limit(1)
    console.log("Place is :", PopularCity[0].count)

    //Profit By month
   
    const profitByMonth: ProfitChartData[] = await db
    .select({
        year: sql<string>`EXTRACT(YEAR FROM TO_DATE(${pnr.dob}, 'YYYY-MM-DD'))`.as('year'),
        month: sql<string>`TO_CHAR(TO_DATE(${pnr.dob}, 'YYYY-MM-DD'), 'Month')`.as('month'),
        profit: sql<number>`SUM(COALESCE(${pnr.markup}, 0))`.as('profit'),
    })
    .from(pnr)
    .where(sql`TO_DATE(${pnr.dob}, 'YYYY-MM-DD') >= NOW() - INTERVAL '6 months'`)
    .groupBy(
        sql`EXTRACT(YEAR FROM TO_DATE(${pnr.dob}, 'YYYY-MM-DD'))`,
        sql`EXTRACT(MONTH FROM TO_DATE(${pnr.dob}, 'YYYY-MM-DD'))`,
        sql`TO_CHAR(TO_DATE(${pnr.dob}, 'YYYY-MM-DD'), 'Month')`
    )
    .orderBy(
        sql`EXTRACT(YEAR FROM TO_DATE(${pnr.dob}, 'YYYY-MM-DD'))`,
        sql`EXTRACT(MONTH FROM TO_DATE(${pnr.dob}, 'YYYY-MM-DD'))`
    );

    console.log(profitByMonth)
        
    //Number of Different airlines
    const usedAirlines : airlinesNumber[] = await db
    .select({
        airlines : sql<string>`${pnr.airlines}`.as('airline'),
        number : sql<number>`COUNT(*)`.as('number')
    })
    .from(pnr)
    .groupBy(sql`${pnr.airlines}`)
    .orderBy(sql<number>`COUNT(*)`)

    console.log(usedAirlines)
    return (
        <div className='p-4'>
            <h2 className='font-bold p-2'>Profit Summary</h2>
            {/* KPI Card for profit */}
            <div className='flex flex-col md:flex-row justify-evenly gap-3'>
                <div className='shadow-xl rounded-xl p-4 md:w-[300px] hover:shadow-slate-600 border border-gray-500'>
                    <FaFileInvoiceDollar className='text-green-600 text-3xl' />
                    <p className='font-bold text-gray-500'>Total Profit</p>
                    <div className='flex justify-between'>
                        <p className='font-semibold text-2xl'>BDT {ProfitResult[0].profit}</p>
                        <FaMoneyBillTrendUp className='text-3xl text-red-600' />
                    </div>
                    <p className='font-bold text-gray-500'>For last 30 days</p>
                </div>
                <div className='shadow-xl rounded-xl p-4 md:w-[300px] hover:shadow-slate-600 border border-gray-500'>
                    <FiTrendingUp className='text-green-600 text-3xl' />
                    <p className='font-bold text-gray-500'>Profit margin</p>
                    <div className='flex justify-between'>
                        <p className='font-semibold text-2xl'>{formatMrgin} %</p>
                        <CiPercent className='text-3xl text-red-600' />
                    </div>
                    <p className='font-bold text-gray-500'>For last 30 days</p>
                </div>
                <div className='shadow-xl rounded-xl p-4 md:w-[300px] hover:shadow-slate-600 border border-gray-500'>
                    <TbRouteAltLeft className='text-green-600 text-3xl' />
                    <p className='font-bold text-gray-500'>Popuar Destination</p>
                    <div className='flex justify-between'>
                        <p className='font-semibold text-xl'>{PopularCity[0].place}</p>
                        <FaRoute className='text-3xl text-red-600' />
                    </div>
                    <p className='font-bold text-gray-500 text-sm'>Total {PopularCity[0].count} PNR are issued for this place</p>
                </div>
            </div>
            <h2 className='font-bold mt-4 ml-3'>Profit Trends</h2>
            <div className='px-6 grid grid-cols-1 md:grid-cols-2 gap-2'>
                <ProfitChart chartData = {profitByMonth} />
                <ProfitByAirlines chartData = {usedAirlines} />
            </div>

        </div>
    )
}

export default ProfitabilityReport
