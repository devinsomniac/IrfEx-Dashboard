import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ClerkProvider } from '@clerk/nextjs'
import Image from 'next/image'
import React, { ReactNode } from 'react'

const layout = ({children} : Readonly<{children : ReactNode}>) => {
  return (
    
    <div>
      <ClerkProvider>
      <SidebarProvider>
          <AppSidebar/>
          <main className="w-full">
            <header className="h-[50px] p-4 flex items-center bg-slate-100 w-full">
            <SidebarTrigger/>
            <Image src={"/irfexlogo.png"} alt="logo" height={80} width={100} />
            </header>
            {children}
          </main>
        </SidebarProvider>
        </ClerkProvider>
    </div>
    
  )
}

export default layout