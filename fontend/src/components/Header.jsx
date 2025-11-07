import { useState } from "react"
import { Menu, X, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, logout, openAuthModal } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MT</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Cửu Long Diaries</span>
          </div>
          <div>
            <nav className="hidden md:flex justify-end gap-8">
              <a href="#cities" className="text-gray-700 hover:text-sky-500 transition">
                Cities
              </a>
              <a href="#food" className="text-gray-700 hover:text-sky-500 transition">
                Food & Dining
              </a>
              <a href="#attractions" className="text-gray-700 hover:text-sky-500 transition">
                Attractions
              </a>
              <a href="#reviews" className="text-gray-700 hover:text-sky-500 transition">
                Reviews
              </a>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" onClick={logout} className="hidden md:inline-flex">
                  Logout
                </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => openAuthModal?.()}
                >
                  Sign In
                </Button>
              )}

              {/* Mobile Menu Button */}
              <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          {/* Desktop Navigation */}
          
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            <a href="#cities" className="text-gray-700 hover:text-sky-500 py-2">
              Cities
            </a>
            <a href="#food" className="text-gray-700 hover:text-sky-500 py-2">
              Food & Dining
            </a>
            <a href="#attractions" className="text-gray-700 hover:text-sky-500 py-2">
              Attractions
            </a>
            <a href="#reviews" className="text-gray-700 hover:text-sky-500 py-2">
              Reviews
            </a>
          </nav>
        )}
      </div>

      {/* Auth Modal is handled globally by the Navbar/Landing layout */}
    </header>
  )
}
