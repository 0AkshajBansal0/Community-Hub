"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getSkills, getEvents } from "@/lib/data"
import DashboardNav from "@/components/dashboard-nav"
import SkillCard from "@/components/skill-card"
import EventCard from "@/components/event-card"
import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function Dashboard() {
  const [skills, setSkills] = useState([])
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("skills")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skillsData = await getSkills()
        const eventsData = await getEvents()
        setSkills(skillsData)
        setEvents(eventsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleTabChange = (value) => {
    setActiveTab(value)
  }

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
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600">Discover skills and events from your community</p>
          </div>
          <div className="space-x-4">
            <Button
              asChild
              variant="outline"
              className="border-rose-200 hover:bg-rose-100/50 transition-all duration-300"
            >
              <Link href="/dashboard/add/skill">Share a Skill</Link>
            </Button>
            <Button
              asChild
              className="bg-rose-600 hover:bg-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
            >
              <Link href="/dashboard/add/event">Post an Event</Link>
            </Button>
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
          <Tabs defaultValue="skills" className="space-y-6" onValueChange={handleTabChange}>
            <TabsList className="bg-rose-100/50 p-1">
              <TabsTrigger
                value="skills"
                className="data-[state=active]:bg-white data-[state=active]:text-rose-700 data-[state=active]:shadow-sm"
              >
                Recent Skills
              </TabsTrigger>
              <TabsTrigger
                value="events"
                className="data-[state=active]:bg-white data-[state=active]:text-rose-700 data-[state=active]:shadow-sm"
              >
                Upcoming Events
              </TabsTrigger>
            </TabsList>

            <TabsContent value="skills">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardHeader className="h-24 bg-gray-200" />
                      <CardContent className="h-32 bg-gray-100" />
                    </Card>
                  ))}
                </div>
              ) : skills.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skills.slice(0, 6).map((skill, index) => (
                    <motion.div key={skill.id} variants={fadeInUp} transition={{ delay: index * 0.1 }}>
                      <SkillCard skill={skill} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card className="border-rose-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="py-10 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-rose-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No skills shared yet</h3>
                    <p className="text-gray-500 mb-6">Be the first to share your talents with the community!</p>
                    <Button asChild className="bg-rose-600 hover:bg-rose-700 transition-all duration-300">
                      <Link href="/dashboard/add/skill">Share a Skill</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {skills.length > 0 && (
                <div className="mt-6 text-center">
                  <Button
                    asChild
                    variant="outline"
                    className="border-rose-200 hover:bg-rose-100/50 transition-all duration-300"
                  >
                    <Link href="/dashboard/skills">View All Skills</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="events">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardHeader className="h-24 bg-gray-200" />
                      <CardContent className="h-32 bg-gray-100" />
                    </Card>
                  ))}
                </div>
              ) : events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.slice(0, 6).map((event, index) => (
                    <motion.div key={event.id} variants={fadeInUp} transition={{ delay: index * 0.1 }}>
                      <EventCard event={event} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card className="border-rose-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="py-10 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-rose-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No events posted yet</h3>
                    <p className="text-gray-500 mb-6">Be the first to organize an event for the community!</p>
                    <Button asChild className="bg-rose-600 hover:bg-rose-700 transition-all duration-300">
                      <Link href="/dashboard/add/event">Post an Event</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {events.length > 0 && (
                <div className="mt-6 text-center">
                  <Button
                    asChild
                    variant="outline"
                    className="border-rose-200 hover:bg-rose-100/50 transition-all duration-300"
                  >
                    <Link href="/dashboard/events">View All Events</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  )
}
