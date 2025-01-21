import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/Database";
import { passenger, pnr } from "@/Database/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Pnr, Passenger } from "@/Database/schema";

const BookingTable = ({ filterInput }: { filterInput: string }) => {
  const [filteredResponse, setFilteredResponse] = useState<
    { pnr: Pnr; passenger: Passenger }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await db
        .select()
        .from(pnr)
        .innerJoin(passenger, eq(pnr.pnrData, passenger.pnr));
      
        const filteredData = filterInput
        ? response.filter(
            (passengerDetails) =>
              (passengerDetails.pnr.pnrData?.toLowerCase() || "").includes(
                filterInput.toLowerCase()
              ) ||
              (passengerDetails.passenger.name?.toLowerCase() || "").includes(
                filterInput.toLowerCase()
              )
          )
        : response;

      setFilteredResponse(filteredData);
    };

    fetchData();
  }, [filterInput]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader className="sticky">
          <TableRow className="py-2">
            <TableHead className="font-bold text-black">PNR</TableHead>
            <TableHead className="font-bold text-black">Date of Booking</TableHead>
            <TableHead className="font-bold text-black">Date of Journey</TableHead>
            <TableHead className="font-bold text-black">Departure Airport</TableHead>
            <TableHead className="font-bold text-black">Arrival Airport</TableHead>
            <TableHead className="font-bold text-black">Flight Number</TableHead>
            <TableHead className="font-bold text-black">Costing</TableHead>
            <TableHead className="font-bold text-black">Markup</TableHead>
            <TableHead className="font-bold text-black">Portal</TableHead>
            <TableHead className="font-bold text-black">Passenger</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredResponse.map((passengerDetail, index) => (
            <TableRow key={index} className="hover:bg-slate-200">
              <TableCell className="font-medium underline">
                <Link href={`/Ticket/${passengerDetail.pnr.pnrData}`}>
                  {passengerDetail.pnr.pnrData}
                </Link>
              </TableCell>
              <TableCell>{passengerDetail.pnr.dob}</TableCell>
              <TableCell>{passengerDetail.pnr.doj}</TableCell>
              <TableCell>{passengerDetail.pnr.departure_address}</TableCell>
              <TableCell>{passengerDetail.pnr.arrival_address}</TableCell>
              <TableCell>{passengerDetail.pnr.flight_number}</TableCell>
              <TableCell>{passengerDetail.pnr.cost ?? "N/A"}</TableCell>
              <TableCell>{passengerDetail.pnr.markup ?? "N/A"}</TableCell>
              <TableCell>{passengerDetail.pnr.portal ?? "N/A"}</TableCell>
              <TableCell>{passengerDetail.passenger.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingTable;
