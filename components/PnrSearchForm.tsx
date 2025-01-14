import React from 'react'
import { Input } from './ui/input'

const PnrSearchForm = () => {
  return (
    <div className="p-2 w-[300px] border rounded-lg">
      <Input type='text' placeholder='Search by PNR or name'/>
    </div>
  )
}

export default PnrSearchForm
