"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X } from "lucide-react"

export default function HomeNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rose-100 bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-rose-600 fill-rose-200" />
          <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Happiness Hub
          </span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link
            href="/#features"
            className="text-sm font-medium text-gray-600 hover:text-rose-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-0 after:bg-rose-600 after:transition-all hover:after:w-full"
          >
            Features
          </Link>
          <Link
            href="/#benefits"
            className="text-sm font-medium text-gray-600 hover:text-rose-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-0 after:bg-rose-600 after:transition-all hover:after:w-full"
          >
            Benefits
          </Link>
          <Link
            href="/#testimonials"
            className="text-sm font-medium text-gray-600 hover:text-rose-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-0 after:bg-rose-600 after:transition-all hover:after:w-full"
          >
            Testimonials
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="ghost" className="text-gray-700 hover:text-rose-600 hover:bg-rose-50">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild className="bg-rose-600 hover:bg-rose-700 transition-all duration-300">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-rose-100 bg-white">
          <div className="container px-4 py-4 flex flex-col gap-4">
            <Link
              href="/#features"
              className="text-sm font-medium text-gray-600 hover:text-rose-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#benefits"
              className="text-sm font-medium text-gray-600 hover:text-rose-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Benefits
            </Link>
            <Link
              href="/#testimonials"
              className="text-sm font-medium text-gray-600 hover:text-rose-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-rose-100">
              <Button asChild variant="outline" className="w-full">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button asChild className="w-full bg-rose-600 hover:bg-rose-700">
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
