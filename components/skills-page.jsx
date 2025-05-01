"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSkills } from "@/lib/data"
import DashboardNav from "@/components/dashboard-nav"
import SkillCard from "@/components/skill-card"
import { Search, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function SkillsPage() {
  const [skills, setSkills] = useState([])
  const [filteredSkills, setFilteredSkills] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skillsData = await getSkills()
        setSkills(skillsData)
        setFilteredSkills(skillsData)
      } catch (error) {
        console.error("Error fetching skills:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let result = skills

    if (searchTerm) {
      result = result.filter(
        (skill) =>
          skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          skill.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (categoryFilter && categoryFilter !== "all") {
      result = result.filter((skill) => skill.category === categoryFilter)
    }

    setFilteredSkills(result)
  }, [searchTerm, categoryFilter, skills])

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
      <DashboardNav />

      <main className="container mx-auto py-8 px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Skills Directory
          </h1>
          <Button
            asChild
            className="bg-rose-600 hover:bg-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
          >
            <Link href="/dashboard/add/skill">Share Your Skill</Link>
          </Button>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-rose-100"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 border-rose-200 focus-visible:ring-rose-500"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="border-rose-200 focus:ring-rose-500">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-24 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredSkills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map((skill, index) => (
                <motion.div key={skill.id} variants={fadeInUp} transition={{ delay: index * 0.05 }}>
                  <SkillCard skill={skill} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div variants={fadeInUp} className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-rose-600" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No skills found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || categoryFilter
                  ? "Try adjusting your search or filter criteria"
                  : "Be the first to share your skills with the community!"}
              </p>
              {!searchTerm && !categoryFilter && (
                <Button
                  asChild
                  className="bg-rose-600 hover:bg-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
                >
                  <Link href="/dashboard/add/skill">Share Your Skill</Link>
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
