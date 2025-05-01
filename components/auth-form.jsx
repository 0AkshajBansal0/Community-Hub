"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { signIn } from "@/lib/auth"

export default function AuthForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const validateEmail = (email) => {
    return email.endsWith("@srmist.edu.in")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!validateEmail(email)) {
      setError("Only @srmist.edu.in email addresses are allowed")
      return
    }

    try {
      await signIn(email, password)
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      setError("Authentication failed. Please try again.")
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <Tabs defaultValue="login">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.name@srmist.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700">
              Login
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="register">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="your.name@srmist.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">Only @srmist.edu.in email addresses are allowed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-password">Password</Label>
              <Input
                id="register-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700">
              Register
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
