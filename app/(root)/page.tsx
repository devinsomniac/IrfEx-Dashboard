import { auth, signIn } from '@/auth';
import { Button } from '@/components/ui/button'

import Image from 'next/image'
import { redirect } from 'next/navigation';
import React from 'react'
import { FcGoogle } from "react-icons/fc";

const page = async() => {
  const session = await auth()
  if(session){
    redirect("/Bookings")
  }
  return (
    <div className='bg-slate-300 flex flex-col justify-center items-center gap-3 h-[100vh]'>
      <div>
        <Image src={'/LoginForm.jpg'} alt='banner login' width={800} height={50} />
      </div>
      <div>
        <form
          action={async () => {
            "use server"
            await signIn("google",{redirectTo : "/Bookings"})
          }}
        >
          <Button type="submit">Signin with Google <FcGoogle/></Button>
        </form>
      </div>
    </div>
  )
}

export default page
