"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { LogOutIcon, MenuIcon, XIcon, PlusIcon } from "lucide-react"
import { toast } from "sonner"

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem("user")
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }
  }, [location.pathname]) // Re-check when route changes

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    navigate("/signin")
    toast.success("Logged out successfully")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Hide menu when clicking outside
  useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false)
    if (isMenuOpen) {
      document.addEventListener("click", closeMenu)
    }
    return () => document.removeEventListener("click", closeMenu)
  }, [isMenuOpen])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Don't show navbar on homepage
  if (location.pathname === "/") return null

  return (
    <header className="border-b border-slate-700 bg-slate-800/90 backdrop-blur-sm sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to={user ? "/community" : "/"} className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white">
            <span className="text-purple-400">Happiness</span> Hub
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <div className="flex items-center gap-4">
                <Link to="/community">
                  <Button variant="ghost" className="hover:bg-slate-700">
                    Community
                  </Button>
                </Link>
                <div className="relative group">
                  <Button variant="ghost" className="hover:bg-slate-700 flex items-center gap-2">
                    <PlusIcon className="h-4 w-4" />
                    Add Content
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-md shadow-lg overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link to="/add-skill">
                      <Button variant="ghost" className="w-full justify-start hover:bg-slate-700 rounded-none">
                        Share a Skill
                      </Button>
                    </Link>
                    <Link to="/add-event">
                      <Button variant="ghost" className="w-full justify-start hover:bg-slate-700 rounded-none">
                        Create an Event
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user.name || user.email} />
                  <AvatarFallback>{user.email.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-white">{user.name || user.email.split("@")[0]}</span>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="hover:bg-slate-700">
                  <LogOutIcon className="h-5 w-5" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/signin">
                <Button variant="ghost" className="hover:bg-slate-700">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-purple-600 hover:bg-purple-700">Join Community</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              toggleMenu()
            }}
            className="hover:bg-slate-700"
          >
            {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </Button>

          {isMenuOpen && (
            <div
              className="absolute top-16 right-4 w-64 bg-slate-800 border border-slate-700 rounded-md shadow-lg z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {user ? (
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-700">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user.name || user.email} />
                      <AvatarFallback>{user.email.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.name || user.email.split("@")[0]}</span>
                      <span className="text-xs text-slate-400">{user.email}</span>
                    </div>
                  </div>
                  <Link to="/community">
                    <Button variant="ghost" className="w-full justify-start hover:bg-slate-700">
                      Community
                    </Button>
                  </Link>
                  <Link to="/add-skill">
                    <Button variant="ghost" className="w-full justify-start hover:bg-slate-700">
                      Share a Skill
                    </Button>
                  </Link>
                  <Link to="/add-event">
                    <Button variant="ghost" className="w-full justify-start hover:bg-slate-700">
                      Create an Event
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start hover:bg-slate-700" onClick={handleLogout}>
                    <LogOutIcon className="h-4 w-4 mr-2" /> Sign Out
                  </Button>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  <Link to="/signin">
                    <Button variant="ghost" className="w-full justify-start hover:bg-slate-700">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Join Community</Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
