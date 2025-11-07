import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar.jsx"

const SidebarLayout = ({ children }) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main>
          {/* <SidebarTrigger />s */}
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default SidebarLayout;
