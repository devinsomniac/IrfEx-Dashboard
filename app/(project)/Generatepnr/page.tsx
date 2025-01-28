"use client";
import React, {  useState } from "react";
import SelectAirlines from "@/components/SelectAirlines";
import { SelectArrAirport } from "@/components/SelectArrAirport";
import { SelectDepAirport } from "@/components/SelectDepAirport";
import Transit from "@/components/Transit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import PassengerList from "@/components/PassengerList";
import { db } from "@/Database";
import { passenger, pnr } from "@/Database/schema";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { LuLoaderPinwheel } from "react-icons/lu";
import { useRouter } from "next/navigation";
const initialFlightDetails = {
  pnrdata: "",
  depAir: { name: "", address: "" , iata : "" },
  arrAir: { name: "", address: "" , iata : ""},
  dob: "",
  doj: "",
  timedep: "",
  timearr: "",
  airline: {airline : "",airline_image : ""},
  flightNo: "",
  flightDuration: "",
  cost: 0,
  markup: 0,
  portal: "",
  transit: { transit: false, place: "" },
  passengers: [""],
}
const Page = () => {
  const router = useRouter();
  const [loading,setLoading] = useState(false)
  const [flightDetails, setFlightDetails] = useState(initialFlightDetails);
  
  const handleChange = (key: string, value: any) => {
    setFlightDetails((prev) => ({ ...prev, [key]: value }));
  };
  console.log(flightDetails)
  const saveToDb = async () => {
    try {
      setLoading(true)
        await db.insert(pnr).values({
        pnrData: flightDetails.pnrdata,
        dob: flightDetails.dob,
        doj: flightDetails.doj,
        timedep: flightDetails.timedep,
        timearr: flightDetails.timearr,
        airlines: flightDetails.airline.airline,
        airline_image : flightDetails.airline.airline_image,
        departure_name: flightDetails.depAir.name,
        departure_address: flightDetails.depAir.address,
        departure_iata : flightDetails.depAir.iata,
        arrival_name: flightDetails.arrAir.name,
        arrival_address: flightDetails.arrAir.address,
        arrival_iata : flightDetails.arrAir.iata,
        cost: flightDetails.cost ,
        markup: flightDetails.markup ,
        portal: flightDetails.portal,
        transit: flightDetails.transit.transit,
        transitairport: flightDetails.transit.place,
        flight_number: flightDetails.flightNo,
        flight_duration: flightDetails.flightDuration,
      });
      for (const passengerName of flightDetails.passengers) {
        await db.insert(passenger).values({
          name: passengerName,
          pnr: flightDetails.pnrdata, 
        });
      }
      toast.success("PNR generated and saved to the database successfully!");
      setFlightDetails(initialFlightDetails)
      router.push(`/Ticket/${flightDetails.pnrdata}`);
    } catch (error) {
      console.error("Error saving to database:", error);
      toast.error("Failed to save PNR to the database. Please try again.");
    }finally{
      setLoading(false)
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveToDb();
  };

  return (
    <div
      className="px-12 py-2 flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url('/bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      
      <h2 className="font-bold text-4xl p-3">Ticket Generator</h2>
      <form className="p-8 shadow-2xl rounded-lg bg-white" onSubmit={handleSubmit}>
        <h3 className="font-semibold text-2xl my-1">Flight Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 justify-center gap-3">
          <div className="flex flex-col">
            <label className="font-bold text-gray-600">Select Departure Airport</label>
            <SelectDepAirport onSelectDepAir={(value) => handleChange("depAir", value)} />
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-gray-600">Select Arrival Airport</label>
            <SelectArrAirport onSelectArrAir={(value) => handleChange("arrAir", value)} />
          </div>
          <div>
            <label className="font-bold text-gray-600">Enter the Date of Booking</label>
            <Input type="date" value={flightDetails.dob} onChange={(e) => handleChange("dob", e.target.value)} />
          </div>
          <div>
            <label className="font-bold text-gray-600">Enter the Date of Journey</label>
            <Input type="date" value={flightDetails.doj} onChange={(e) => handleChange("doj", e.target.value)} />
          </div>
          <div>
            <label className="font-bold text-gray-600">Enter the Time of Departure</label>
            <Input type="time" onChange={(e) => handleChange("timedep", e.target.value)} />
          </div>
          <div>
            <label className="font-bold text-gray-600">Enter the Time of Arrival</label>
            <Input type="time" onChange={(e) => handleChange("timearr", e.target.value)} />
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-gray-600">Select Airlines</label>
            <SelectAirlines onSelectAirline={(value) => handleChange("airline", value)} />
          </div>
          <div>
            <label className="font-bold text-gray-600">Enter Flight Number</label>
            <Input placeholder="Enter Flight Number" onChange={(e) => handleChange("flightNo", e.target.value)} />
          </div>
          <div>
            <label className="font-bold text-gray-600">Flight Duration</label>
            <Input placeholder="Flight Duration" onChange={(e) => handleChange("flightDuration", e.target.value)} />
          </div>
          <div>
            <label className="font-bold text-gray-600">Enter the PNR</label>
            <Input placeholder="PNR" onChange={(e) => handleChange("pnrdata", e.target.value)} />
          </div>
          <div>
            <label className="font-bold text-gray-600">Cost</label>
            <Input placeholder="Cost" onChange={(e) => handleChange("cost", e.target.value)} />
          </div>
          <div>
            <label className="font-bold text-gray-600">MarkUp</label>
            <Input placeholder="MarkUp" onChange={(e) => handleChange("markup", e.target.value)} />
          </div>
          <div>
            <label className="font-bold text-gray-600">Portal</label>
            <Input placeholder="Portal" onChange={(e) => handleChange("portal", e.target.value)} />
          </div>
          <div>
            <Transit handleTransitInfo={(value) => handleChange("transit", value)} />
          </div>
        </div>
        <Separator className="my-2" />
        <h3 className="font-semibold text-2xl my-1">Passenger Details</h3>
        <div>
          <PassengerList handlePassengerlist={(value) => handleChange("passengers", value)} />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>{
            loading ? <LuLoaderPinwheel className="animate-spin" /> : "Generate"
            }</Button>
        </div>
      </form>
      <Image src={"/banner.png"} alt="poster" width={700} height={50} className="p-4" />
      <Toaster />
    </div>
  );
};

export default Page;
