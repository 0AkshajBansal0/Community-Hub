"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addEvent } from "@/lib/data"
import DashboardNav from "@/components/dashboard-nav"
import { motion } from "framer-motion"

export default function AddEventForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const categories = [
    "Academic",
    "Workshop",
    "Cultural",
    "Sports",
    "Competition",
    "Seminar",
    "Conference",
    "Social",
    "Other",
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !description || !date || !time || !location || !category) {
      return
    }

    setIsSubmitting(true)

    try {
      await addEvent({
        title,
        description,
        date,
        time,
        location,
        category,
      })

      router.push("/dashboard/events")
      router.refresh()
    } catch (error) {
      console.error("Error adding event:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
      <DashboardNav />

      <main className="container mx-auto py-8 px-4">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <Card className="max-w-2xl mx-auto p-6 border-rose-100 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Post a New Event
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-700">
                  Event Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's your event called?"
                  className="border-rose-200 focus-visible:ring-rose-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-700">
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category" className="border-rose-200 focus:ring-rose-500">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-gray-700">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border-rose-200 focus-visible:ring-rose-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-gray-700">
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="border-rose-200 focus-visible:ring-rose-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-700">
                  Location
                </Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where will the event take place?"
                  className="border-rose-200 focus-visible:ring-rose-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your event, what participants can expect, and any other important details..."
                  className="min-h-[150px] border-rose-200 focus-visible:ring-rose-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                  className="border-rose-200 hover:bg-rose-100/50 transition-all duration-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-rose-600 hover:bg-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
                >
                  {isSubmitting ? "Submitting..." : "Post Event"}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
