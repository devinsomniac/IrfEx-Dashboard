import { IoTicketSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user";

type userType = {
  name: string,
    email: string,
    avatar: string,
}
  const user : userType = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
}

const items = [
  {
    title: "Bookings",
    url: "/Bookings",
    icon: <IoTicketSharp />    ,
  },
  {
    title: "Generate PNR",
    url: "/Generatepnr",
    icon: <IoSettingsSharp />    ,
  },
  {
    title: "Regular Customer",
    url: "/RegCust",
    icon: <FaRegUserCircle />    ,
  },
  {
    title: "Dashboard",
    url: "/Dashboard",
    icon: <MdDashboard />,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Reservation Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-slate-300">
        <NavUser user = {user} />
      </SidebarFooter>
    </Sidebar>
  )
}

