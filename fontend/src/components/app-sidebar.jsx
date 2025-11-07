import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Info,
  Star,
  Bookmark,
  LayoutDashboard 
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  generals: [
    {
      name: "Trình điêu khiển",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Lịch trình của bạn",
      url: "/schedule",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
  discovers: [
    {
      name: "Hướng dẫn",
      url: "#",
      icon: Info,
    },
    {
      name: "Dành cho bạn",
      url: "#",
      icon: Star,
    },
    {
      name: "Đã lưu",
      url: "#",
      icon: Bookmark,
    },
  ],
};





export function AppSidebar({ ...props }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/plan");
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarFooter>
        <NavUser user={data.user} />
        <Button className="w-full my-3 bg-sky-700 py-3" onClick={handleClick}>+ Tạo chuyến đi</Button>
      </SidebarFooter>
      <SidebarContent>
        <NavProjects nameLable={"Tổng quan"} items={data.generals} />
        <NavProjects nameLable={"Khám phá"} items={data.discovers} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
