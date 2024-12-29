"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Dumbbell,
  BarChart,
  Settings,
  User,
  CreditCard,
  Bell,
  LogOut,
  ChevronUp,
  Crown,
  Users,
  Apple,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { logout } from "@/utils/auth";

const menuItems = [
  { name: "Home", icon: Home, path: "/" },
  { name: "Workouts", icon: Dumbbell, path: "/workouts" },
  { name: "Progress Tracker", icon: BarChart, path: "/progress-tracker" },
  { name: "Nutrition", icon: Apple, path: "/nutrition" },
  { name: "Social", icon: Users, path: "/social" },
  { name: "Messages", icon: MessageCircle, path: "/messages" },
  { name: "Group Workouts", icon: Calendar, path: "/group-workouts" },
  { name: "Forum", icon: MessageCircle, path: "/forum" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <ShadcnSidebar
      collapsible="icon"
      className="group-data-[collapsible=icon]:w-[60px] flex"
    >
      <SidebarHeader>
        <div className="flex h-16 items-center px-4">
          <h2 className="text-lg font-semibold transition-opacity duration-200 group-data-[collapsible=icon]:opacity-0">
            TEW AI Workout
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="absolute right-[-12px]">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.path}
                tooltip={item.name}
                className="group-data-[collapsible=icon]:justify-center"
              >
                <Link href={item.path} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="transition-opacity duration-200 group-data-[collapsible=icon]:hidden">
                    {item.name}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-4 rounded-lg p-2 hover:bg-accent group-data-[collapsible=icon]:justify-center">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col overflow-hidden transition-opacity duration-200 group-data-[collapsible=icon]:hidden">
                  <span className="truncate text-sm font-medium">John Doe</span>
                  <span className="truncate text-xs text-muted-foreground">
                    john@example.com
                  </span>
                </div>
                <ChevronUp className="h-4 w-4 text-muted-foreground transition-opacity duration-200 group-data-[collapsible=icon]:hidden" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-80"
              align="start"
              alignOffset={11}
              forceMount
            >
              <div className="flex flex-col space-y-4 p-2">
                <p className="text-xs font-medium leading-none text-muted-foreground">
                  john@example.com
                </p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Free Plan
                    </p>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/upgrade"
                  className="flex items-center gap-2 text-primary"
                >
                  <Crown className="h-4 w-4" />
                  <span>Upgrade to Pro</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/account" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/billing" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Billing</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/notifications"
                    className="flex items-center gap-2"
                  >
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
      <SidebarTrigger className="absolute right-[-12px] top-6 h-6 w-6" />
    </ShadcnSidebar>
  );
}
