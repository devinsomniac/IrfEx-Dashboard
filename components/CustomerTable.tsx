"use client"
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead, 
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { db } from '@/Database'
import { Passenger, passenger } from '@/Database/schema'

const CustomerTable = ({filterInput} : {filterInput : string}) => {
    const [filteredPassengerDetails,setFilteredPassengerDetails] = useState<Passenger[]>([])
    useEffect(() => {
        const filterCustomer = async() => {
            const response = await db.select().from(passenger)
            const filteredResponse = filterInput?response.filter((passenger)=>(passenger.name?.toLowerCase()||"").includes(filterInput.toLowerCase())) : response
            setFilteredPassengerDetails(filteredResponse)
        }
       filterCustomer()
    },[filterInput])
    
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Passport</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Visa</TableHead>
                        <TableHead>Visa Expiry</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredPassengerDetails.map((passenger,index)=>(
                        <TableRow key={index}>
                        <TableCell className="font-medium">{passenger.name}</TableCell>
                        <TableCell>{passenger.passport}</TableCell>
                        <TableCell>{passenger.visa}</TableCell>
                        <TableCell>{passenger.visaex}</TableCell>
                    </TableRow>
                    ))}
                    
                </TableBody>
            </Table>

        </div>
    )
}

export default CustomerTable
