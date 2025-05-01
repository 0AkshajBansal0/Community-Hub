import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, Clock } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default function EventCard({ event }) {
  const { title, description, date, time, location, category, user } = event

  const getInitials = (email) => {
    if (!email) return "U"
    return email.split("@")[0].substring(0, 2).toUpperCase()
  }

  // Check if event is today
  const isToday = () => {
    const today = new Date()
    const eventDate = new Date(date)
    return today.toDateString() === eventDate.toDateString()
  }

  // Check if event is upcoming (within next 7 days)
  const isUpcoming = () => {
    const today = new Date()
    const nextWeek = new Date(today)
    nextWeek.setDate(today.getDate() + 7)
    const eventDate = new Date(date)
    return eventDate > today && eventDate <= nextWeek
  }

  return (
    <Card className="h-full flex flex-col overflow-hidden border-rose-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="pb-2 relative">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg group-hover:text-rose-700 transition-colors duration-300">{title}</CardTitle>
          <div className="flex gap-2">
            {isToday() && <Badge className="bg-green-500 hover:bg-green-600">Today</Badge>}
            {isUpcoming() && !isToday() && <Badge className="bg-blue-500 hover:bg-blue-600">Soon</Badge>}
            <Badge variant="outline" className="bg-rose-50 text-rose-700 hover:bg-rose-100">
              {category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4 relative">
        <p className="text-sm text-gray-700 line-clamp-3">{description}</p>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-rose-500" />
            <span>{formatDate(new Date(date))}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-rose-500" />
            <span>{time}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-rose-500" />
            <span>{location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t border-rose-100 relative">
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6 border border-rose-100">
            <AvatarImage src="/placeholder.svg" alt={user.email} />
            <AvatarFallback className="bg-rose-100 text-rose-700 text-xs">{getInitials(user.email)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600">Posted by {user.email.split("@")[0]}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
