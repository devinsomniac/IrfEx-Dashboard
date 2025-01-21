import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { db } from "@/Database"
import { passenger, pnr } from "@/Database/schema"
import { eq } from "drizzle-orm"
  

const BookingTable = async() => {
  const response  = await db.select().from(pnr).innerJoin(passenger,eq(pnr.pnrData,passenger.pnr))
  console.log(response)
  return (
    <div>
      <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader className="sticky">
    <TableRow className="py-2">
      <TableHead className="font-bold text-black">PNR</TableHead>
      <TableHead className="font-bold text-black">Date of Booking</TableHead>
      <TableHead className="font-bold text-black">Date of Journey</TableHead>
      <TableHead className="font-bold text-black">Depurture Airport</TableHead>
      <TableHead className="font-bold text-black">Arrival Airport</TableHead>
      <TableHead className="font-bold text-black">Flight Number</TableHead>
      <TableHead className="font-bold text-black">Costing</TableHead>
      <TableHead className="font-bold text-black">Markup</TableHead>
      <TableHead className="font-bold text-black">Portal</TableHead>
      <TableHead className="font-bold text-black">Passenger</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {response.map((passengerDetails,index) => (
      <TableRow key={index}>
      <TableCell className="font-medium">{passengerDetails.pnr.pnrData}</TableCell>
      <TableCell>{passengerDetails.pnr.dob}</TableCell>
      <TableCell>{passengerDetails.pnr.doj}</TableCell>
      <TableCell>{passengerDetails.pnr.departure_address}</TableCell>
      <TableCell>{passengerDetails.pnr.arrival_address}</TableCell>
      <TableCell>{passengerDetails.pnr.flight_number}</TableCell>
      <TableCell>{passengerDetails.pnr.cost}</TableCell>
      <TableCell>{passengerDetails.pnr.markup}</TableCell>
      <TableCell>{passengerDetails.pnr.portal}</TableCell>
      <TableCell>{passengerDetails.passenger.name}</TableCell>
    </TableRow>
    ))}
    
  </TableBody>
</Table>

    </div>
  )
}

export default BookingTable
