import { Home, PlusCircle, Search, Settings, User } from "lucide-react";

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

// Menu items.
const items = [
  {
    title: "الرئيسية",
    url: "#",
    icon: Home,
  },
  {
    title: "إضافة زبون",
    url: "#",
    icon: PlusCircle,
  },
  {
    title: "الزبائن",
    url: "#",
    icon: User,
  },
  {
    title: "بحث",
    url: "#",
    icon: Search,
  },
  {
    title: "الإعدادات",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>NFC CARD APP</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, i) => (
                <SidebarMenuItem
                  key={item.title}
                  style={{ marginTop: i + 1 === items.length ? "auto" : "" }}
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
