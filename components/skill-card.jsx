"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "@/lib/utils"

export default function SkillCard({ skill }) {
  const { title, description, category, user, createdAt } = skill

  const getInitials = (email) => {
    if (!email) return "U"
    return email.split("@")[0].substring(0, 2).toUpperCase()
  }

  return (
    <Card className="h-full flex flex-col overflow-hidden border-rose-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="pb-2 relative">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg group-hover:text-rose-700 transition-colors duration-300">{title}</CardTitle>
          <Badge variant="outline" className="bg-rose-50 text-rose-700 hover:bg-rose-100">
            {category}
          </Badge>
        </div>
        <CardDescription className="text-sm text-gray-500">{formatDistanceToNow(new Date(createdAt))}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow relative">
        <p className="text-sm text-gray-700">{description}</p>
      </CardContent>
      <CardFooter className="pt-2 border-t border-rose-100 relative">
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6 border border-rose-100">
            <AvatarImage src="/placeholder.svg" alt={user.email} />
            <AvatarFallback className="bg-rose-100 text-rose-700 text-xs">{getInitials(user.email)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600">{user.email.split("@")[0]}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
