"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/lib/auth"
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SignupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
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

      // Password validation
      if (password.length < 8) {
        setError("Password must be at least 8 characters long")
        setIsSubmitting(false)
        return
      }

      // Password confirmation
      if (password !== confirmPassword) {
        setError("Passwords do not match")
        setIsSubmitting(false)
        return
      }

      // Sign up and sign in
      await signIn(email, password)
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      setError("Registration failed. Please try again.")
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
          <div className="relative">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.name@srmist.edu.in"
              className="pr-10 focus-visible:ring-rose-500"
              required
            />
            {email && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {validateEmail(email) ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500">Only @srmist.edu.in email addresses are allowed</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700">
            Password
          </Label>
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
          <div className="space-y-1 pt-1">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "h-1 flex-1 rounded-full",
                  password.length === 0 && "bg-gray-200",
                  password.length > 0 && password.length < 8 && "bg-red-500",
                  password.length >= 8 && password.length < 12 && "bg-yellow-500",
                  password.length >= 12 && "bg-green-500",
                )}
              ></div>
              <div
                className={cn(
                  "h-1 flex-1 rounded-full",
                  password.length < 8 && "bg-gray-200",
                  password.length >= 8 && password.length < 12 && "bg-yellow-500",
                  password.length >= 12 && "bg-green-500",
                )}
              ></div>
              <div
                className={cn(
                  "h-1 flex-1 rounded-full",
                  password.length < 12 && "bg-gray-200",
                  password.length >= 12 && "bg-green-500",
                )}
              ></div>
            </div>
            <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-gray-700">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pr-10 focus-visible:ring-rose-500"
              required
            />
            {confirmPassword && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {password === confirmPassword ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-rose-600 hover:bg-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </div>
  )
}
