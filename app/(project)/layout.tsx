import { auth } from '@/auth'
import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { SessionProvider } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const layout = async({ children }: Readonly<{ children: ReactNode }>) => {
  const session = await auth()
  if(!session){
    redirect("/")
  }
  return (

    <div>
      <SessionProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <header className="h-[50px] p-4 flex items-center bg-slate-100 w-full">
              <SidebarTrigger />
              <Image src={"/irfexlogo.png"} alt="logo" height={80} width={100} />
            </header>
            {children}
          </main>
        </SidebarProvider>
      </SessionProvider>
    </div>

  )
}

export default layout