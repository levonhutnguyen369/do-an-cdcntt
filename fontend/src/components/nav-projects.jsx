import { Link, useNavigate } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import tripApi from "@/api/tripApi";

export function NavProjects({ items, nameLable }) {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  const handleClick = async (item) => {
    if (item.url === "/schedule") {
      try {
        const response = await tripApi.getList({});
        // Giả sử backend trả về response.data.trips hoặc response.data
        const trips = response.data?.data || [];
        localStorage.setItem("tripList", JSON.stringify(trips || []));
        navigate("/schedule");
      } catch (error) {
        console.error("Failed to load trips:", error);
      }
    } else {
      navigate(item.url);
    }
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{nameLable}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild onClick={() => handleClick(item)}>
              <button className="flex items-center gap-2 w-full text-left">
                <item.icon />
                <span className="text-base font-medium">{item.name}</span>
              </button>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
