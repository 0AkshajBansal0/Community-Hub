"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { toast } from "sonner"
import { LightbulbIcon, ArrowLeftIcon } from "lucide-react"
import { BackgroundBeams } from "../components/ui/background-beams"

export default function AddSkillPage() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: "skill",
    title: "",
    description: "",
    category: "",
  })
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem("user")
    if (!loggedInUser) {
      navigate("/signin")
      return
    }

    setUser(JSON.parse(loggedInUser))
  }, [navigate])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.description || !formData.category) {
      toast.error("Please fill all required fields")
      return
    }

    setIsLoading(true)

    try {
      // Send to backend
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          author: {
            name: user.name || user.email.split("@")[0],
            email: user.email,
            avatar: user.avatar || "/placeholder.svg?height=40&width=40",
          },
        }),
      })

      if (response.ok) {
        toast.success("Skill shared successfully!")

        // Reset form
        setFormData({
          type: "skill",
          title: "",
          description: "",
          category: "",
        })

        // Navigate back to community
        navigate("/community")
      } else {
        const data = await response.json()
        toast.error(data.message || "Failed to share skill")
      }
    } catch (error) {
      console.error("Error creating post:", error)
      toast.error("Could not connect to the server. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden pt-4">
      <BackgroundBeams className="opacity-20" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Link to="/community" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6">
          <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to Community
        </Link>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-500/20 p-2 rounded-full">
                <LightbulbIcon className="h-6 w-6 text-purple-400" />
              </div>
              <CardTitle className="text-2xl font-bold">Share a Skill</CardTitle>
            </div>
            <CardDescription className="text-zinc-400">
              Share your expertise with the community. What skills can you teach others?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="skill-title">Skill Title</Label>
                <Input
                  id="skill-title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g., Web Development, Guitar Lessons, Photography"
                  className="bg-slate-700 border-slate-600"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skill-description">Description</Label>
                <Textarea
                  id="skill-description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe your skill, what you can teach, and how others can benefit..."
                  className="bg-slate-700 border-slate-600 min-h-[150px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skill-category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Art">Art</SelectItem>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Wellness">Wellness</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-slate-700 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/community")}
              className="border-slate-600 text-white hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "Sharing..." : "Share Skill"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
