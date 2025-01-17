import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const SelectAirlines = ({onSelectAirline} : {onSelectAirline : (airline : string) => void}) => {
    const airlines = [
        {
            name: "Indigo",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLIEyJ-EYgoHpuFHPKfA4Qr4BqkDChWRbjsQ&s"
        },
        {
            name: "Air India",
            image: "https://d3lzcn6mbbadaf.cloudfront.net/media/details/air18THAPRIL.jpg"
        },
        {
            name: "Air Asia",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdXXDrYyUQ-4vllSsPOV2Zii55by8x2dq_GQ&s"
        },
        {
            name: "Air India Express",
            image: "https://d3lzcn6mbbadaf.cloudfront.net/media/details/air18THAPRIL.jpg"
        },
        {
            name: "Akasa Airlines",
            image: "https://logos-world.net/wp-content/uploads/2022/01/Akasa-Air-Logo-700x394.png"
        },
        {
            name: "SpiceJet",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1It5Oah7fHdZL38VXew09vHthM6tLgfxL2A&s"
        },
        {
            name: "Alliance Air",
            image: "https://i0.wp.com/betteraviationjobs.com/storage/2020/08/Alliance-Air-Logo.jpg?fit=558%2C558&ssl=1"
        },
        {
            name: "Emirates",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1934px-Emirates_logo.svg.png"
        },
        {
            name: "British Airways",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMkrHp1xK4Ehd0b6xWa5ZnNdZOupeGX4kdTQ&s"
        },
        {
            name: "Etihad",
            image: "https://i.pinimg.com/474x/f7/2a/89/f72a89442830e8c9fc0733c085fc702e.jpg"
        },
        {
            name: "Singapore Airlines",
            image: "https://i.pinimg.com/originals/16/b6/26/16b6262ceb60aefde74b2b496d2654bb.jpg"
        },
        {
            name: "Air Arabia",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfZro1q8UpdWph5QjfgUCQB7R5ZD8llKkm7g&s"
        },
        {
            name: "Biman Bangladesh",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3C0sfQpx4VjO9nB6U4sVw0Wsh89akYnfcPA&s"
        },
        {
            name: "US-Bangla",
            image: "https://bucket.barta24.com/uploads/news/2020/Jan/06/1578302889292.jpg"
        },
        {
            name: "Thai Airways",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZCWFMUEpgIymhbG8Tm1O8zCfDmiUb_x38XQ&s"
        }
    ]
    return (
        <div>

            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Airlines" />
                </SelectTrigger>
                <SelectContent>
                    {airlines.map((airline, index) => (
                        <SelectItem onClick={(e) => {onSelectAirline(airline.name)}} key={index} value={airline.name}>{airline.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

        </div>
    )
}

export default SelectAirlines
