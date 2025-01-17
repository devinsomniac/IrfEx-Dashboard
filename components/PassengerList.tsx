"use client";
import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const PassengerList = ({
  handlePassengerlist,
}: {
  handlePassengerlist: (passengers: string[]) => void;
}) => {
  const [passengerInput, setPassengerInput] = useState<string[]>([""]);

  const handleAddPassenger = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (passengerInput.length < 9) {
      const updatedPassengers = [...passengerInput, ""];
      setPassengerInput(updatedPassengers);
      handlePassengerlist(updatedPassengers); // Notify the parent about the updated list
    }
  };

  const handleInput = (index: number, value: string) => {
    const updatedPassengers = [...passengerInput];
    updatedPassengers[index] = value;
    setPassengerInput(updatedPassengers);
    handlePassengerlist(updatedPassengers); // Notify the parent about the updated list
  };

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-3">
        {passengerInput.map((passenger, index) => (
          <div key={index}>
            <label className="font-bold text-gray-600">
              Enter Passenger {index + 1} name
            </label>
            <Input
              placeholder="Enter Passenger Name"
              className="w-[220px]"
              value={passenger}
              onChange={(e) => handleInput(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      {passengerInput.length < 9 ? (
        <Button
          className="bg-yellow-500 rounded-full text-black font-bold my-2 text-2xl hover:bg-yellow-500 hover:shadow-xl"
          onClick={handleAddPassenger}
        >
          <IoMdAddCircleOutline className="text-white hover:text-black" />
        </Button>
      ) : (
        <p>*An itinerary can have a maximum of 9 passengers</p>
      )}
    </div>
  );
};

export default PassengerList;
