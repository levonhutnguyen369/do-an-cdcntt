/* no local state needed */
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, openAuthModal } = useAuth();

  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-center h-16">
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex justify-between gap-8 font-medium">
            <a
              href="/"
              className="text-gray-700 hover:text-sky-500 transition items-center flex"
            >
              Trang chủ
            </a>
            <a
              href="#food"
              className="text-gray-700 hover:text-sky-500 transition flex items-center"
            >
              Nhà hàng
            </a>
            <a
              href="#attractions"
              className="text-gray-700 hover:text-sky-500 transition flex items-center"
            >
              Địa điểm
            </a>
            
            <a
              href="#reviews"
              className="text-gray-700 hover:text-sky-500 transition flex items-center"
            >
              Liên hệ
            </a>
            {/* <Button
              onClick={handleSchedule}
              className="bg-sky-500 hover:bg-sky-600 text-white"
            >
              Lich trình của tôi
            </Button> */}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => navigate("/schedule")}
                  className="bg-sky-500 hover:bg-sky-600 text-white"
                >
                  Lịch trình của tôi
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      Hồ sơ
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button
                onClick={() => openAuthModal?.()}
                className="bg-sky-500 hover:bg-sky-600 text-white"
              >
                Đăng nhập
              </Button>
            )}
          </div>
        </div>
        {/* Desktop Navigation */}
      </div>

      {/* Global AuthModal is rendered in the Header component for the landing layout */}
    </div>
  );
};
export default Navbar;
