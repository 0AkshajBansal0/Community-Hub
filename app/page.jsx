import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Users, Calendar, Sparkles } from "lucide-react"
import HomeNav from "@/components/home-nav"
import HomeFooter from "@/components/home-footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
      <HomeNav />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-28">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[40%] top-0 h-[500px] w-[500px] rounded-full bg-rose-100/30 blur-3xl"></div>
          <div className="absolute right-[20%] bottom-0 h-[400px] w-[400px] rounded-full bg-pink-100/30 blur-3xl"></div>
        </div>

        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Connect, Share & Grow Together
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl lg:text-2xl">
                  A vibrant community platform exclusively for SRM students to share skills, discover events, and build
                  meaningful connections.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-rose-600 hover:bg-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px] group"
                >
                  <Link href="/signup">
                    Join the Community
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-rose-200 hover:bg-rose-100/50 transition-all duration-300"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full blur-3xl opacity-30"></div>
              <Image
                src="/placeholder.svg?height=500&width=500"
                width={500}
                height={500}
                alt="Community Illustration"
                className="relative z-10 drop-shadow-xl animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-rose-700">
              How Happiness Hub Works
            </h2>
            <p className="mt-4 text-gray-600 md:text-xl max-w-3xl mx-auto">
              Our platform makes it easy to connect with fellow students, share your talents, and discover exciting
              events.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border border-rose-100 group">
              <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-rose-200 transition-colors">
                <Users className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Connect with Peers</h3>
              <p className="text-gray-600">
                Find and connect with fellow students who share your interests or have skills you want to learn.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border border-rose-100 group">
              <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-rose-200 transition-colors">
                <Heart className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Share Your Skills</h3>
              <p className="text-gray-600">
                Showcase your talents and expertise, helping others while building your reputation on campus.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border border-rose-100 group">
              <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-rose-200 transition-colors">
                <Calendar className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Discover Events</h3>
              <p className="text-gray-600">
                Find and participate in campus events, workshops, and activities that match your interests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-rose-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm font-medium text-rose-800">
                Why Join Us?
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                Building a Happier Campus Community
              </h2>
              <p className="text-gray-600 md:text-xl">
                Our platform is designed to foster connections, encourage skill sharing, and create a more vibrant
                campus life.
              </p>

              <ul className="space-y-4 mt-8">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="h-3 w-3 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Exclusive SRM Community</h3>
                    <p className="text-gray-600">
                      Only students with @srmist.edu.in email addresses can join, ensuring a trusted network.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="h-3 w-3 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Discover Hidden Talents</h3>
                    <p className="text-gray-600">Find students with unique skills you didn't know existed on campus.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="h-3 w-3 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Never Miss an Event</h3>
                    <p className="text-gray-600">Stay updated on all campus activities, workshops, and gatherings.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-200 to-pink-200 rounded-2xl blur-3xl opacity-30"></div>
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-rose-100">
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-rose-400 to-pink-400"></div>
                <div className="pt-24 p-8">
                  <div className="space-y-6">
                    <div className="bg-rose-50 rounded-lg p-4">
                      <h4 className="font-medium text-rose-800">Upcoming Workshop</h4>
                      <p className="text-gray-600 text-sm">Web Development Basics - Tomorrow at 4 PM</p>
                    </div>
                    <div className="bg-rose-50 rounded-lg p-4">
                      <h4 className="font-medium text-rose-800">Popular Skill</h4>
                      <p className="text-gray-600 text-sm">Guitar Lessons - 15 students interested</p>
                    </div>
                    <div className="bg-rose-50 rounded-lg p-4">
                      <h4 className="font-medium text-rose-800">New Connection</h4>
                      <p className="text-gray-600 text-sm">Priya wants to learn about your photography skills</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-rose-700">
              What Students Say
            </h2>
            <p className="mt-4 text-gray-600 md:text-xl max-w-3xl mx-auto">
              Hear from students who have already joined our community.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-lg border border-rose-100 relative">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <div className="text-6xl text-rose-200">"</div>
                </div>
                <p className="text-gray-600 mb-6 relative z-10">
                  "The Happiness Hub has been amazing for finding study partners and discovering events I would have
                  missed otherwise. It's made my campus experience so much better!"
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-rose-200 mr-3"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Student Name</h4>
                    <p className="text-sm text-gray-500">Computer Science, 3rd Year</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-rose-500 to-pink-500 text-white">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Join Our Community?
            </h2>
            <p className="mt-4 text-rose-100 md:text-xl">
              Sign up today and start connecting with fellow students, sharing skills, and discovering events.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-rose-600 hover:bg-rose-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
              >
                <Link href="/signup">Create Account</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 transition-all duration-300"
              >
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  )
}
