import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

const BookingTable = () => {
  return (
    <div>
      <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader className="sticky">
    <TableRow>
      <TableHead>PNR</TableHead>
      <TableHead>Date of Booking</TableHead>
      <TableHead>Date of Journey</TableHead>
      <TableHead>Depurture Airport</TableHead>
      <TableHead>Arrival Airport</TableHead>
      <TableHead>Costing</TableHead>
      <TableHead>Markup</TableHead>
      <TableHead>Portal</TableHead>
      <TableHead>Passenger</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>

    </div>
  )
}

export default BookingTable
