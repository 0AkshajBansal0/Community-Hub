import Link from "next/link"
import Image from "next/image"
import SignupForm from "@/components/signup-form"
import HomeNav from "@/components/home-nav"
import HomeFooter from "@/components/home-footer"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
      <HomeNav />

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0">
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Join the Happiness Hub</h1>
              <p className="mt-3 text-gray-600">
                Create your account to connect with fellow students, share skills, and discover events.
              </p>
            </div>

            <SignupForm />

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-rose-600 hover:text-rose-500 underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="hidden lg:block w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full blur-3xl opacity-30"></div>
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-rose-100 p-8">
              <div className="aspect-square relative">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  fill
                  alt="Community Illustration"
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="mt-8 space-y-4">
                <div className="bg-rose-50 rounded-lg p-4">
                  <h4 className="font-medium text-rose-800">Exclusive SRM Community</h4>
                  <p className="text-gray-600 text-sm">Connect with students across all departments</p>
                </div>
                <div className="bg-rose-50 rounded-lg p-4">
                  <h4 className="font-medium text-rose-800">Share Your Talents</h4>
                  <p className="text-gray-600 text-sm">Help others while showcasing your skills</p>
                </div>
                <div className="bg-rose-50 rounded-lg p-4">
                  <h4 className="font-medium text-rose-800">Discover Events</h4>
                  <p className="text-gray-600 text-sm">Never miss important campus activities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HomeFooter />
    </div>
  )
}
