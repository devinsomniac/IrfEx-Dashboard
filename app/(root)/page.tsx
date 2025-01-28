import { Button } from '@/components/ui/button'
import { SignedOut, SignInButton} from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import { FcGoogle } from "react-icons/fc";

const page = () => {
  return (
    <div className='bg-slate-300 flex flex-col justify-center items-center gap-3 h-[100vh]'>
      <div>
    <Image src={'/LoginForm.jpg'} alt='banner login' width={800} height={50}/>
      </div>
      <div>
      <SignedOut>
          <SignInButton>
          <Button className='bg-slate-200 text-black border border-gray-400'>Sign in With Google <FcGoogle />
          </Button>
            </SignInButton> 
        </SignedOut>
      </div>
    </div>
  )
}

export default page
