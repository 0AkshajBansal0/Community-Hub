"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, X, Home, Calendar, Lightbulb, LogOut, Heart, Bell } from "lucide-react"
import { signOut, getUser } from "@/lib/auth"
import { cn } from "@/lib/utils"

export default function DashboardNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const user = getUser()

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = () => {
    signOut()
    window.location.href = "/"
  }

  const getInitials = (email) => {
    if (!email) return "U"
    return email.split("@")[0].substring(0, 2).toUpperCase()
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: <Home className="h-5 w-5 mr-2" /> },
    { href: "/dashboard/skills", label: "Skills", icon: <Lightbulb className="h-5 w-5 mr-2" /> },
    { href: "/dashboard/events", label: "Events", icon: <Calendar className="h-5 w-5 mr-2" /> },
  ]

  return (
    <nav
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-rose-600 fill-rose-200" />
              <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Happiness Hub
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  pathname === item.href
                    ? "bg-rose-50 text-rose-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-rose-600",
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative text-gray-700 hover:text-rose-600 hover:bg-rose-50">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-rose-50 hover:text-rose-600">
                  <Avatar className="h-8 w-8 border border-rose-100">
                    <AvatarImage src="/placeholder.svg" alt={user?.email || "User"} />
                    <AvatarFallback className="bg-rose-100 text-rose-700">{getInitials(user?.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium text-gray-900">{user?.email.split("@")[0]}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-red-500 cursor-pointer focus:text-red-500 focus:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-rose-100 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-base font-medium",
                  pathname === item.href
                    ? "bg-rose-50 text-rose-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-rose-600",
                )}
                onClick={closeMenu}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-rose-100">
              <div className="flex items-center px-3 py-2">
                <div className="flex-shrink-0">
                  <Avatar className="h-10 w-10 border border-rose-100">
                    <AvatarImage src="/placeholder.svg" alt={user?.email || "User"} />
                    <AvatarFallback className="bg-rose-100 text-rose-700">{getInitials(user?.email)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.email.split("@")[0]}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
