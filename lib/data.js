"use client"

// This is a client-side mock data service
// In a real application, you would use a proper database or API

import { getUser } from "./auth"

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Initialize data from localStorage if available
let skills = []
let events = []

if (isBrowser) {
  try {
    const storedSkills = localStorage.getItem("happiness_hub_skills")
    const storedEvents = localStorage.getItem("happiness_hub_events")

    if (storedSkills) {
      skills = JSON.parse(storedSkills)
    } else {
      // Add some sample skills if none exist
      skills = [
        {
          id: "1",
          title: "Web Development",
          description:
            "I can help with HTML, CSS, JavaScript, React, and Next.js. I've been coding for 3 years and have built several projects.",
          category: "Technical",
          user: {
            id: "sample1",
            email: "john.doe@srmist.edu.in",
          },
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        },
        {
          id: "2",
          title: "Guitar Lessons",
          description:
            "I've been playing guitar for 5 years and can teach beginners how to play basic chords, strumming patterns, and simple songs.",
          category: "Music",
          user: {
            id: "sample2",
            email: "jane.smith@srmist.edu.in",
          },
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
        },
        {
          id: "3",
          title: "Mathematics Tutoring",
          description:
            "I can help with calculus, linear algebra, and statistics. I'm a third-year mathematics major with experience tutoring first-year students.",
          category: "Academic",
          user: {
            id: "sample3",
            email: "alex.kumar@srmist.edu.in",
          },
          createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
        },
      ]

      // Save sample skills to localStorage
      localStorage.setItem("happiness_hub_skills", JSON.stringify(skills))
    }

    if (storedEvents) {
      events = JSON.parse(storedEvents)
    } else {
      // Add some sample events if none exist
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)
      const nextWeek = new Date(today)
      nextWeek.setDate(today.getDate() + 7)

      events = [
        {
          id: "1",
          title: "Web Development Workshop",
          description: "Learn the basics of HTML, CSS, and JavaScript in this hands-on workshop. Bring your laptop!",
          date: today.toISOString().split("T")[0],
          time: "14:00",
          location: "Tech Building, Room 301",
          category: "Workshop",
          user: {
            id: "sample1",
            email: "john.doe@srmist.edu.in",
          },
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
        },
        {
          id: "2",
          title: "Music Club Meetup",
          description: "Join us for an evening of music and jamming. All skill levels welcome!",
          date: tomorrow.toISOString().split("T")[0],
          time: "18:00",
          location: "Student Center, Music Room",
          category: "Social",
          user: {
            id: "sample2",
            email: "jane.smith@srmist.edu.in",
          },
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        },
        {
          id: "3",
          title: "Mathematics Competition",
          description: "Test your math skills in this friendly competition. Prizes for the top three winners!",
          date: nextWeek.toISOString().split("T")[0],
          time: "10:00",
          location: "Science Building, Auditorium",
          category: "Competition",
          user: {
            id: "sample3",
            email: "alex.kumar@srmist.edu.in",
          },
          createdAt: new Date(Date.now() - 86400000 * 4).toISOString(), // 4 days ago
        },
      ]

      // Save sample events to localStorage
      localStorage.setItem("happiness_hub_events", JSON.stringify(events))
    }
  } catch (error) {
    console.error("Error loading data from localStorage:", error)
  }
}

// Helper to save data to localStorage
const saveData = () => {
  if (isBrowser) {
    localStorage.setItem("happiness_hub_skills", JSON.stringify(skills))
    localStorage.setItem("happiness_hub_events", JSON.stringify(events))
  }
}

// Skills
export async function getSkills() {
  // In a real app, you would fetch from an API
  return skills
}

export async function addSkill(skillData) {
  const user = getUser()

  if (!user) {
    throw new Error("You must be logged in to add a skill")
  }

  const newSkill = {
    id: Date.now().toString(),
    ...skillData,
    user: {
      id: user.id,
      email: user.email,
    },
    createdAt: new Date().toISOString(),
  }

  skills = [newSkill, ...skills]
  saveData()

  return newSkill
}

// Events
export async function getEvents() {
  // Sort events by date (upcoming first)
  return [...events].sort((a, b) => new Date(a.date) - new Date(b.date))
}

export async function addEvent(eventData) {
  const user = getUser()

  if (!user) {
    throw new Error("You must be logged in to add an event")
  }

  const newEvent = {
    id: Date.now().toString(),
    ...eventData,
    user: {
      id: user.id,
      email: user.email,
    },
    createdAt: new Date().toISOString(),
  }

  events = [newEvent, ...events]
  saveData()

  return newEvent
}
