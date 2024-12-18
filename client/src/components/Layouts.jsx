import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { Outlet } from "react-router-dom";
import {
  adminFakultasMenu,
  adminUniversitasMenu,
  userMenu,
} from "@/config/menuConfig";

export default function Layout({ role }) {
  let menu;
  switch (role) {
    case "admin fakultas":
      menu = adminFakultasMenu;
      break;
    case "admin universitas":
      menu = adminUniversitasMenu;
      break;
    case "user":
      menu = userMenu;
      break;
    default:
      menu = [];
  }

  return (
    <div className="flex">
      <SidebarProvider>
        <AppSidebar menu={menu} />
        <main className="flex-1 p-4">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}