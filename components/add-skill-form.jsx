"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addSkill } from "@/lib/data"
import DashboardNav from "@/components/dashboard-nav"
import { motion } from "framer-motion"

export default function AddSkillForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const categories = [
    "Academic",
    "Technical",
    "Arts",
    "Sports",
    "Music",
    "Language",
    "Cooking",
    "Professional",
    "Other",
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !description || !category) {
      return
    }

    setIsSubmitting(true)

    try {
      await addSkill({
        title,
        description,
        category,
      })

      router.push("/dashboard/skills")
      router.refresh()
    } catch (error) {
      console.error("Error adding skill:", error)
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
              Share Your Skill
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-700">
                  Skill Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What skill are you sharing?"
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

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your skill, experience level, and how you can help others..."
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
                  {isSubmitting ? "Submitting..." : "Share Skill"}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
