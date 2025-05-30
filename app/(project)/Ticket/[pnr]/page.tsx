import { FaRegClock } from "react-icons/fa";
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FaUserLarge } from "react-icons/fa6";
import { MdHelp } from "react-icons/md";
import DownloadButton from "@/components/DownloadTicket";
import { db } from "@/Database";
import { passenger, pnr } from "@/Database/schema";
import { eq } from "drizzle-orm";

const page = async ({ params, }: { params: Promise<{ pnr: string }> }) => {
    const pnrData = (await params).pnr
    const response = await db.select().from(pnr).where(eq(pnr.pnrData, pnrData))
    console.log(response)
    const date = new Date(response[0].doj);
    console.log(date)
    const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    console.log(response)
    const passengerList = await db.select().from(passenger).where(eq(passenger.pnr, pnrData))
    console.log(passengerList)
    return (
        <>
            <div className='p-10 flex justify-center'>
                <div id='ticket' className='w-[595px] h-[842px] p-8  border border-black'>
                    {/* Headong and logo */}
                    <div className='flex justify-between items-center'>
                        <div className='flex items-end gap-2'>
                            <h2 className='text-2xl font-bold'>E-ticket</h2>
                            <h2 >PNR : <span className='font-bold'>{response[0].pnrData}</span></h2>
                        </div>
                        <Image src={'/logo.png'} alt='logo' height={50} width={120} />
                    </div>
                    <Separator className='bg-gray-500 mt-2' />
                    {/* Sub heading with destinantion and arrival */}
                    <div className='flex gap-2 items-end'>
                        <h2 className='font-bold text-[15px] mb-0 mt-0'>{response[0].departure_address} to {response[0].arrival_address}</h2>
                        <h2 className="text-[10px] mt-0 mb-0">{formattedDate}</h2>
                    </div>
                    <Separator className='bg-gray-500 my-2' />
                    {/* Itinerary Details */}
                    <div className='grid grid-cols-4 p-2 items-start'>
                        {/* Airline Logo */}

                        <div className='text-left text-[10px] text-gray-500  w-[100px]'>
                            {/* Flight name number and fare type */}
                            <Image src={response[0].airline_image || ""} height={30} width={50} alt="airline logo" />
                            <h2 className="mb-0 text-black font-bold">{response[0].airlines}</h2>
                            <p className="mb-0">{response[0].flight_number}</p>
                            <p className="mb-0">Fare type : Standard</p>
                        </div>
                        {/* Depurture IATA,time ,Date, Airport Address */}
                        <div>
                            <h2 className="mb-0">{response[0].departure_iata} <span className='font-bold'>{response[0].timedep.split(":").slice(0, 2).join(":")}</span></h2>
                            <p className='text-gray-500 text-[10px] mb-0'>{formattedDate}</p>
                            <p className='text-gray-500 text-[10px] mb-0'>{response[0].departure_name} - {response[0].departure_address}</p>
                        </div>
                        {/* Duration and economy */}
                        <div className="flex flex-col items-center text-[10px] ">
                            <FaRegClock />
                            <p className="text-[10px] mb-0 font-bold">{response[0].flight_duration}</p>
                            <p className="text-[10px] mb-0 text-gray-500">Economy</p>
                            {response[0].transit ? (
                                <>
                                <p className="text-[10px] text-center mb-0 text-gray-500">Transit at </p>
                                <p className="text-center text-gray-500">{response[0].transitairport}</p>
                                </>
                            ) : (
                                <p className="text-[10px] text-center mb-0">Direct Flight</p>
                            )}
                        </div>
                        {/* Arrival IATA, time, Date Airport Address */}
                        <div className="text-right">
                            <h2 className="mb-0"><span className="font-bold ">{response[0].timearr.split(":").slice(0, 2).join(":")}</span> {response[0].arrival_iata}</h2>
                            <p className='text-gray-500 text-[10px] mb-0'>{formattedDate}</p>
                            <p className='text-gray-500 text-[10px] mb-0 '>{response[0].arrival_name} - {response[0].arrival_address}</p>
                        </div>
                    </div>
                    <Separator className='bg-gray-500 mt-2' />
                    {/* Passenger Details */}
                    <div>
                        <Table>
                            <TableCaption className="text-[8px] mt-0 mb-0 text-center">A list of Passengers Travelling</TableCaption>
                            <TableHeader className="mb-0">
                                <TableRow className="mb-0">
                                    <TableHead className="text-[12px] w-[400px] border-r-2 mb-0">Travellers</TableHead>
                                    <TableHead className="text-[12px] border-r-2 mb-0">PNR</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {passengerList.map((passengerName, index) => (
                                    <TableRow className="mb-0" key={index}>
                                        <TableCell className="mb-0 mt-0 font-bold text-[10px] flex gap-2 items-center border-r-2">
                                            <FaUserLarge />
                                            <p className="mb-0 mt-0">{passengerName.name}</p>
                                        </TableCell>
                                        <TableCell className="font-bold text-[10px] border-r-2 mb-0">{passengerName.pnr}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    {/* Tip */}
                    <Separator className='bg-gray-500  mb-0 mt-0' />
                    <p className="text-[8px] mb-0 mt-0">Tip : Dress in layers. Planes are often too hot or too cold.</p>
                    <Separator className='bg-gray-500  mt-1' />
                    {/* Some Notes */}
                    <div>
                        <h2 className="font-bold">Please Note:</h2>
                        <ul className="list-disc ml-4 text-[8px] text-gray-600">
                            <li className="pt-1 mb-0">Check-in Timing: Please arrive at the airport at least 2-3 hours prior to departure for international flights and 1-2 hours for domestic flights.</li>
                            <li className="pt-1 mb-0">Baggage Allowance: Ensure your luggage complies with the airlines baggage policy. Additional charges may apply for excess baggage.</li>
                            <li className="pt-1 mb-0">Valid Identification: Carry a valid government-issued photo ID or passport for verification at check-in and boarding.</li>
                            <li className="pt-1 mb-0">Prohibited Items: Review the list of prohibited items for both carry-on and checked baggage to ensure compliance with security regulations.</li>
                            <li className="pt-1 mb-0">Boarding Pass: Keep your boarding pass handy throughout your journey. You may need it for security checks and boarding the flight.</li>
                            <li className="pt-1 mb-0">Electronic Devices: Switch off or enable flight mode on all electronic devices during the flight as instructed by the cabin crew.</li>
                            <li className="pt-1 mb-0">Gate Closure: Boarding gates typically close 20-30 minutes before the scheduled departure time. Late arrivals may not be allowed to board.</li>
                            <li className="pt-1 mb-0">Health & Safety: Follow all health and safety guidelines provided by the airline and airport authorities, including wearing a mask if required.</li>
                            <li className="pt-1 mb-0">Emergency Contact: Keep the airlines customer service number and emergency contacts accessible for assistance during your journey.</li>
                        </ul>
                    </div>
                    {/* Fare Breakup */}
                    {/* <div>
                    <h2 className="font-bold">Fare Breakup :</h2>
                    <div className="w-[400px] text-xs text-gray-600  grid grid-cols-4">
                        <div className="col-span-2">
                            <p>Base Fare:</p>
                            <p>User Development Fee: </p>
                            <p>Cute Fee: </p>
                            <p>Other charges: </p>
                            <p>Discounts And Cashbacks:</p>
                            <p>GST(Airline): </p>
                            <p>Total Fare:</p>
                        </div>
                        <div className="col-span-2">
                            <p>Rs. 14500</p>
                            <p>Rs. 1482</p>
                            <p>Rs. 100</p>
                            <p>Rs. 1272</p>
                            <p>Rs. -700</p>
                            <p>Rs. 710</p>
                            <p>Rs. 17364</p>
                        </div>
                    </div>
                </div> */}
                    {/* Agent Contact */}
                    <div className="flex gap-2 items-center border border-b-2 border-black p-2">
                        <p className="font-bold mb-0 mt-0 flex gap-1 items-center"><MdHelp /> Need Help? Call +8801711325022</p>
                    </div>
                    {/* Banner */}
                    <div className="flex justify-center">
                        <Image src={'/banner.png'} alt="banner" height={200} width={400} />
                    </div>
                </div>

            </div>
            <div className="flex justify-center p-2">
                <DownloadButton />
            </div>

        </>
    )
}

export default page
