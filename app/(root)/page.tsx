"use client"
import BookingTable from "@/components/BookingTable";
import PnrSearchForm from "@/components/PnrSearchForm";
import { useState } from "react";


export default function Home() {
  const [filterInput,setFilterInput] = useState("")
  return (
    <div className="p-8">
      <div>
      <PnrSearchForm onFilterInput = {setFilterInput}/>
      </div>
      <div className="border my-2 h-[600px] overflow-y-auto">
        <BookingTable filterInput = {filterInput}/>
      </div>
    </div>
  );
}
