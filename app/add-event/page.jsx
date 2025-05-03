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
import { CalendarIcon, ArrowLeftIcon } from "lucide-react"
import { BackgroundBeams } from "../components/ui/background-beams"

export default function AddEventPage() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: "event",
    title: "",
    description: "",
    category: "",
    date: "",
    location: "",
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

    if (!formData.title || !formData.description || !formData.category || !formData.date || !formData.location) {
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
        toast.success("Event created successfully!")

        // Reset form
        setFormData({
          type: "event",
          title: "",
          description: "",
          category: "",
          date: "",
          location: "",
        })

        // Navigate back to community
        navigate("/community")
      } else {
        const data = await response.json()
        toast.error(data.message || "Failed to create event")
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
        <Link to="/community" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6">
          <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to Community
        </Link>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-cyan-500/20 p-2 rounded-full">
                <CalendarIcon className="h-6 w-6 text-cyan-400" />
              </div>
              <CardTitle className="text-2xl font-bold">Create an Event</CardTitle>
            </div>
            <CardDescription className="text-zinc-400">
              Organize an event for the community. Share details so others can join.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="event-title">Event Title</Label>
                <Input
                  id="event-title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g., Yoga Workshop, Tech Meetup, Music Concert"
                  className="bg-slate-700 border-slate-600"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea
                  id="event-description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe your event, what participants can expect, and any requirements..."
                  className="bg-slate-700 border-slate-600 min-h-[150px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="event-category">Category</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="event-date">Date & Time</Label>
                  <Input
                    id="event-date"
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="bg-slate-700 border-slate-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-location">Location</Label>
                <Input
                  id="event-location"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="e.g., Main Auditorium, Tech Park, Online (Zoom)"
                  className="bg-slate-700 border-slate-600"
                  required
                />
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
            <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700" disabled={isLoading} onClick={handleSubmit}>
              {isLoading ? "Creating..." : "Create Event"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
