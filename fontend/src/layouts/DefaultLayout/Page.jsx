import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/layouts/components/Header";
import Footer from "../components/Footer/Footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import React from "react";

const Page = ({ mainContent }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1">
          {/* Main content */}
          <div className="flex flex-1 flex-col gap-4 pt-0">
            {mainContent}
          </div>

        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Page;
