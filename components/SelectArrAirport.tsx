"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

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
    id : number;
    address : string;
    iata : string
  };
export function SelectArrAirport({onSelectArrAir} : {onSelectArrAir : (airport : {name : string,address : string , iata : string}) => void}) {
    const BASE_URL = "https://airport-info.p.rapidapi.com/airport?iata="
    const api = process.env.NEXT_PUBLIC_RAPID_API!
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [airports, setAirports] = React.useState<Airport[]>([])
    const [userInput,setUserInput] = React.useState("")
    const debouncedInput = useDebounce(userInput,500)

    function useDebounce(value: string, delay: number) {
        const [debouncedValue, setDebouncedValue] = React.useState(value);
      
        React.useEffect(() => {
          const handler = setTimeout(() => setDebouncedValue(value), delay);
          return () => clearTimeout(handler);
        }, [value, delay]);
      
        return debouncedValue;
      }
    React.useEffect(() => {
        const fetchAirportDetails = async() => {
            const resposne = await fetch(`${BASE_URL}${userInput}`,{
                method:"GET",
                headers: {
                    'x-rapidapi-key': api,
                    'x-rapidapi-host': 'airport-info.p.rapidapi.com',
                    'Content-Type': 'application/json'
                }
            })
            if(!resposne){
                throw new Error ("There has been an error")
            }
            const data = await resposne.json()
            setAirports([
                {
                  value: data.iata,
                  label: data.name, 
                  id : data.id,
                  address : data.location,
                  iata : data.iata
                },
              ]);
        }
        if (debouncedInput.length >= 3) { // Minimum 3 characters
            fetchAirportDetails()
          }
        
    },[debouncedInput])
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
                    <Input placeholder="Search For Airport" className="h-9" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)} />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {airports.map((airport,index) => (
                                <CommandItem
                                    key={index}
                                    value={airport.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        onSelectArrAir({name : airport.label,address : airport.address , iata:airport.iata})
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
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
