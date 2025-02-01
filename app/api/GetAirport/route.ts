import { NextRequest, NextResponse } from "next/server";
const BASE_URL = "https://airport-info.p.rapidapi.com/airport?iata="
const api = process.env.RAPID_API!
export const GET = async(req:NextRequest):Promise<NextResponse> => {
    try{
        const iata = req.nextUrl.searchParams.get("iata"); 
        if (!iata) {
            return NextResponse.json({ error: "IATA code is required" }, { status: 400 });
        }
        const response = await fetch(`${BASE_URL}${iata}`, {
            method: "GET",
            headers: {
                'x-rapidapi-key': api,
                'x-rapidapi-host': 'airport-info.p.rapidapi.com',
            }
        })
        
        if (!response.ok) {
            throw new Error("There has been an error")
        }
        const data = await response.json();
        const headers = new Headers();
        headers.append("Access-Control-Allow-Origin", "*");  
        headers.append("Access-Control-Allow-Methods", "GET, OPTIONS");
        headers.append("Access-Control-Allow-Headers", "Content-Type");
        console.log("API Response:", data);
        return NextResponse.json(data, { headers });
        
         
    }catch(err){
        console.log("There has been an error in fetching airport",err)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}