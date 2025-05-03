import { Link } from "react-router-dom"
import { Button } from "./components/ui/button"
import { Card, CardContent } from "./components/ui/card"
import { BackgroundBeams } from "./components/ui/background-beams"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-4 relative overflow-hidden">
      <BackgroundBeams />

      <div className="container px-4 md:px-6 mx-auto max-w-5xl relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 opacity-75 blur"></div>
            <div className="relative bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text">
              <h1 className="text-5xl md:text-7xl font-bold">Happiness Hub</h1>
            </div>
          </div>

          <p className="max-w-[700px] text-xl md:text-2xl text-zinc-200">
            A community platform for SRM students to share skills, organize events, and build meaningful connections.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link to="/signin">
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-md text-lg font-medium">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-3 rounded-md text-lg font-medium"
              >
                Join Community
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full">
            <FeatureCard
              title="Share Skills"
              description="Showcase your talents and expertise with the community"
              icon="🌟"
              color="from-purple-500/20 to-purple-700/10"
            />
            <FeatureCard
              title="Discover Events"
              description="Find and join community events that interest you"
              icon="🎉"
              color="from-cyan-500/20 to-cyan-700/10"
            />
            <FeatureCard
              title="Connect"
              description="Build meaningful relationships with fellow students"
              icon="🤝"
              color="from-blue-500/20 to-blue-700/10"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const FeatureCard = ({ title, description, icon, color }) => {
  return (
    <Card
      className={`bg-gradient-to-br ${color} border-slate-700 hover:border-purple-500/50 transition-all duration-300 h-full backdrop-blur-sm`}
    >
      <CardContent className="p-6">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-zinc-400">{description}</p>
      </CardContent>
    </Card>
  )
}
