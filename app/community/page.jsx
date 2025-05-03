"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { toast } from "sonner"
import { SearchIcon, CalendarIcon, LightbulbIcon, FilterIcon, PlusIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { BackgroundBeams } from "../components/ui/background-beams"

export default function CommunityPage() {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("all") // "all", "today", "week", "month"
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem("user")
    if (!loggedInUser) {
      navigate("/signin")
      return
    }

    setUser(JSON.parse(loggedInUser))

    // Fetch posts
    fetchPosts()
  }, [navigate])

  const fetchPosts = async () => {
    setIsLoading(true)
    try {
      // Fetch from backend
      const response = await fetch("http://localhost:5000/api/posts")

      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      } else {
        toast.error("Failed to fetch community posts")
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
      toast.error("Could not connect to the server. Please try again later.")
      setPosts([]) // Set empty array if fetch fails
    } finally {
      setIsLoading(false)
    }
  }

  // Get unique categories for filter
  const categories = [...new Set(posts.map((post) => post.category))].filter(Boolean)

  const filteredPosts = posts.filter((post) => {
    // Filter by type
    if (filter !== "all" && post.type !== filter) return false

    // Filter by category
    if (categoryFilter && categoryFilter !== "all" && post.category !== categoryFilter) return false

    // Filter by date
    if (dateFilter !== "all") {
      const postDate = new Date(post.createdAt)
      const now = new Date()

      if (dateFilter === "today") {
        // Check if post was created today
        if (postDate.toDateString() !== now.toDateString()) return false
      } else if (dateFilter === "week") {
        // Check if post was created within the last 7 days
        const weekAgo = new Date(now.setDate(now.getDate() - 7))
        if (postDate < weekAgo) return false
      } else if (dateFilter === "month") {
        // Check if post was created within the last 30 days
        const monthAgo = new Date(now.setDate(now.getDate() - 30))
        if (postDate < monthAgo) return false
      }
    }

    // Search by title, description, or category
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        post.title?.toLowerCase().includes(searchLower) ||
        post.description?.toLowerCase().includes(searchLower) ||
        post.category?.toLowerCase().includes(searchLower) ||
        post.author?.name?.toLowerCase().includes(searchLower)
      )
    }

    return true
  })

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden pt-4">
      <BackgroundBeams className="opacity-20" />

      <main className="container mx-auto px-4 py-4 relative z-10">
        <Card className="bg-slate-800/50 border-slate-700 mb-8 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-3xl font-bold">Community Hub</CardTitle>
                <CardDescription className="text-zinc-400">
                  Discover skills and events shared by the SRM community
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Link to="/add-skill">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <LightbulbIcon className="h-4 w-4 mr-2" /> Share Skill
                  </Button>
                </Link>
                <Link to="/add-event">
                  <Button className="bg-cyan-600 hover:bg-cyan-700">
                    <CalendarIcon className="h-4 w-4 mr-2" /> Create Event
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 w-full"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Category</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 w-full">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Date</label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 w-full">
                      <SelectValue placeholder="All Time" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Type</label>
                  <Tabs defaultValue={filter} className="w-full" onValueChange={setFilter}>
                    <TabsList className="bg-slate-700 border border-slate-600 w-full justify-start">
                      <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 flex-1">
                        All
                      </TabsTrigger>
                      <TabsTrigger value="skill" className="data-[state=active]:bg-purple-600 flex-1">
                        Skills
                      </TabsTrigger>
                      <TabsTrigger value="event" className="data-[state=active]:bg-cyan-600 flex-1">
                        Events
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-slate-700 pt-4">
            <div className="flex justify-between items-center w-full">
              <div className="text-sm text-zinc-400">
                {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"} found
              </div>
              <Button
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-700"
                onClick={() => {
                  setSearchTerm("")
                  setCategoryFilter("")
                  setDateFilter("all")
                  setFilter("all")
                }}
              >
                Reset Filters
              </Button>
            </div>
          </CardFooter>
        </Card>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <Card className="bg-slate-800/50 border-slate-700 text-center py-12 backdrop-blur-sm">
            <CardContent>
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="bg-slate-700 p-4 rounded-full">
                  {filter === "skill" ? (
                    <LightbulbIcon className="h-8 w-8 text-purple-400" />
                  ) : filter === "event" ? (
                    <CalendarIcon className="h-8 w-8 text-cyan-400" />
                  ) : (
                    <FilterIcon className="h-8 w-8 text-purple-400" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white">No posts found</h3>
                <p className="text-zinc-400 max-w-md">
                  {searchTerm || categoryFilter || dateFilter !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Be the first to share something with the community!"}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Link to="/add-skill">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <LightbulbIcon className="h-4 w-4 mr-2" /> Share a Skill
                    </Button>
                  </Link>
                  <Link to="/add-event">
                    <Button className="bg-cyan-600 hover:bg-cyan-700">
                      <CalendarIcon className="h-4 w-4 mr-2" /> Create an Event
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post._id || post.id} post={post} />
            ))}
          </div>
        )}

        {/* Floating action button for mobile */}
        <div className="fixed bottom-6 right-6 md:hidden">
          <div className="relative group">
            <Button className="h-14 w-14 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg">
              <PlusIcon className="h-6 w-6" />
            </Button>
            <div className="absolute bottom-16 right-0 flex flex-col gap-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link to="/add-event">
                <Button className="h-12 w-12 rounded-full bg-cyan-600 hover:bg-cyan-700 shadow-lg">
                  <CalendarIcon className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/add-skill">
                <Button className="h-12 w-12 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg">
                  <LightbulbIcon className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const formatEventDate = (dateString) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleString(undefined, options)
  }

  const isEvent = post.type === "event"
  const cardClass = isEvent
    ? "bg-gradient-to-br from-slate-800/80 to-slate-800/60 border-slate-700 hover:border-cyan-500/50"
    : "bg-gradient-to-br from-slate-800/80 to-slate-800/60 border-slate-700 hover:border-purple-500/50"

  return (
    <Card className={`${cardClass} overflow-hidden transition-all duration-300 h-full flex flex-col backdrop-blur-sm`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          {isEvent ? (
            <div className="bg-cyan-500/20 p-2 rounded-full">
              <CalendarIcon className="h-5 w-5 text-cyan-400" />
            </div>
          ) : (
            <div className="bg-purple-500/20 p-2 rounded-full">
              <LightbulbIcon className="h-5 w-5 text-purple-400" />
            </div>
          )}
          <span className="text-sm font-medium text-zinc-300">{isEvent ? "Event" : "Skill Share"}</span>
          <span className="ml-auto text-xs text-zinc-500">{formatDate(post.createdAt)}</span>
        </div>

        <CardTitle className="text-xl mb-1">{post.title}</CardTitle>

        <div className="mb-2">
          <span
            className={`inline-block ${isEvent ? "bg-cyan-900/30" : "bg-purple-900/30"} text-xs font-medium px-2.5 py-1 rounded-full ${isEvent ? "text-cyan-300" : "text-purple-300"}`}
          >
            {post.category}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pb-4 flex-grow">
        <p className="text-zinc-400 mb-4">{post.description}</p>

        {isEvent && (
          <div className="space-y-2 mb-4 bg-slate-700/50 p-3 rounded-md border border-slate-600/50">
            <div className="flex items-center text-sm text-zinc-300">
              <CalendarIcon className="h-4 w-4 mr-2 text-cyan-400" />
              {formatEventDate(post.date)}
            </div>
            <div className="flex items-center text-sm text-zinc-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {post.location}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-4 border-t border-slate-700">
        <div className="flex items-center w-full">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={post.author?.avatar || "/placeholder.svg"} alt={post.author?.name} />
            <AvatarFallback>{post.author?.name ? post.author.name.substring(0, 2).toUpperCase() : "??"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{post.author?.name}</p>
            <p className="text-xs text-zinc-500">{post.author?.email}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
