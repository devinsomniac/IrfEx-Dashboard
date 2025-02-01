"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup, 
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "./ui/input"

type Airport = {
    value: string;
    label: string;
    id: number;
    address: string;
    iata: string;
};

export function SelectDepAirport({ onSelectDepAir }: { onSelectDepAir: (airport: { name: string; address: string; iata: string }) => void }) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [airports, setAirports] = React.useState<Airport[]>([]);
    const [userInput, setUserInput] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (!userInput) return; 

        const fetchAirportDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://irfexdashboard.vercel.app/api/getairport?iata=${userInput}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch airport data");
                }
                const data = await response.json();
                setAirports([
                    {
                        value: data.iata,
                        label: data.name,
                        id: data.id,
                        address: data.location,
                        iata: data.iata
                    }
                ]);
            } catch (err) {
                console.error("Error fetching airport data:", err);
            } finally {
                setLoading(false);
            }
        };

        if(userInput.length === 3){
            fetchAirportDetails();
        }
    }, [userInput]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between overflow-hidden"
                >
                    {value
                        ? airports.find((airport) => airport.value === value)?.label
                        : "Select Airport..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <Input
                        placeholder="Search For Airport"
                        className="h-9"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)}
                    />
                    <CommandList>
                        {userInput && (
                            <>
                                <CommandEmpty>{!loading && "No Airport Found"}</CommandEmpty>
                                <CommandGroup className="flex justify-center items-center">
                                    {loading ? (
                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                    ) : (
                                        airports.map((airport, index) => (
                                            <CommandItem
                                                key={index}
                                                value={airport.value}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue === value ? "" : currentValue);
                                                    setOpen(false);
                                                    onSelectDepAir({
                                                        name: airport.label,
                                                        address: airport.address,
                                                        iata: airport.iata
                                                    });
                                                }}
                                            >
                                                {airport.label}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        value === airport.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))
                                    )}
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
