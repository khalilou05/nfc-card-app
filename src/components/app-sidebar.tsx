import {
  Home,
  LogOutIcon,
  PlusCircle,
  Search,
  Settings,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "الرئيسية",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "إضافة زبون",
    url: "dashboard/add",
    icon: PlusCircle,
  },
  {
    title: "الزبائن",
    url: "dashboard/customers",
    icon: User,
  },
  {
    title: "بحث",
    url: "search",
    icon: Search,
  },
];

const bottomItems = [
  {
    title: "الإعدادات",
    url: "#",
    icon: Settings,
  },
  {
    title: "خروج",
    url: "#",
    icon: LogOutIcon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar
      side="right"
      className="h-screen"
    >
      <SidebarContent className="h-full">
        <SidebarGroup className="h-full flex flex-col">
          <SidebarGroupLabel>NFC CARD APP</SidebarGroupLabel>

          {/* This must also stretch */}
          <SidebarGroupContent className="flex-1">
            <SidebarMenu className="flex h-full flex-col justify-between">
              {/* Top items */}
              <div>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>

              {/* Bottom items */}
              <div>
                {bottomItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
