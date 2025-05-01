"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getEvents } from "@/lib/data"
import DashboardNav from "@/components/dashboard-nav"
import EventCard from "@/components/event-card"
import { Search, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await getEvents()
        setEvents(eventsData)
        setFilteredEvents(eventsData)
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let result = events

    if (searchTerm) {
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (categoryFilter && categoryFilter !== "all") {
      result = result.filter((event) => event.category === categoryFilter)
    }

    if (dateFilter && dateFilter !== "any") {
      const today = new Date()
      const nextWeek = new Date(today)
      nextWeek.setDate(today.getDate() + 7)
      const nextMonth = new Date(today)
      nextMonth.setMonth(today.getMonth() + 1)

      result = result.filter((event) => {
        const eventDate = new Date(event.date)

        if (dateFilter === "today") {
          return eventDate.toDateString() === today.toDateString()
        } else if (dateFilter === "week") {
          return eventDate >= today && eventDate <= nextWeek
        } else if (dateFilter === "month") {
          return eventDate >= today && eventDate <= nextMonth
        }
        return true
      })
    }

    setFilteredEvents(result)
  }, [searchTerm, categoryFilter, dateFilter, events])

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
            Events Calendar
          </h1>
          <Button
            asChild
            className="bg-rose-600 hover:bg-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
          >
            <Link href="/dashboard/add/event">Post an Event</Link>
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
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 border-rose-200 focus-visible:ring-rose-500"
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="border-rose-200 focus:ring-rose-500">
                  <SelectValue placeholder="Category" />
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
            <div className="w-full md:w-48">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="border-rose-200 focus:ring-rose-500">
                  <SelectValue placeholder="Time frame" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This week</SelectItem>
                  <SelectItem value="month">This month</SelectItem>
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
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <motion.div key={event.id} variants={fadeInUp} transition={{ delay: index * 0.05 }}>
                  <EventCard event={event} />
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
              <h3 className="text-xl font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || categoryFilter || dateFilter
                  ? "Try adjusting your search or filter criteria"
                  : "Be the first to post an event for the community!"}
              </p>
              {!searchTerm && !categoryFilter && !dateFilter && (
                <Button
                  asChild
                  className="bg-rose-600 hover:bg-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
                >
                  <Link href="/dashboard/add/event">Post an Event</Link>
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
