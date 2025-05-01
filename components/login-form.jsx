"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { signIn } from "@/lib/auth"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const validateEmail = (email) => {
    return email.endsWith("@srmist.edu.in")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      // Email validation
      if (!validateEmail(email)) {
        setError("Only @srmist.edu.in email addresses are allowed")
        setIsSubmitting(false)
        return
      }

      // Sign in
      await signIn(email, password)
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      setError("Authentication failed. Please check your credentials and try again.")
      setIsSubmitting(false)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-rose-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.name@srmist.edu.in"
            className="focus-visible:ring-rose-500"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-gray-700">
              Password
            </Label>
            <Link
              href="#"
              className="text-xs font-medium text-rose-600 hover:text-rose-500 underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10 focus-visible:ring-rose-500"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="remember" checked={rememberMe} onCheckedChange={setRememberMe} />
          <Label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
          >
            Remember me
          </Label>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-rose-600 hover:bg-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </div>
  )
}
