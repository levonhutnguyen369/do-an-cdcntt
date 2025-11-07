import Banner from "@/components/Banner";
import FamousAttractions from "@/components/FamousAttractions";
import PopularCity from "@/components/PopularCity";
import PopularFood from "@/components/PopularFood";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Ban } from "lucide-react";
import React, { Component } from "react";

const LandingPage = () => {
  return (
    <>
      <div>
        <Banner />
        <PopularCity />
        <PopularFood />
        <FamousAttractions />
      </div>
    </>
  );
};

export default LandingPage;
