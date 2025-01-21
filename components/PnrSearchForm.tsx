"use client"
import React, { ChangeEvent, useState } from 'react'

const PnrSearchForm = ({ onFilterInput } : {onFilterInput : (value : string) => void }) => {
  const [input,setInput] = useState("")
  const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
    onFilterInput(event.target.value) 
  }

  return (
    <div className="p-2 w-[300px] border rounded-lg">
      <input
        type='text'
        placeholder='Search by PNR or name'
        value={input}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
    </div>
  )
}

export default PnrSearchForm
