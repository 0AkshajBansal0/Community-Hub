import Link from "next/link"
import Image from "next/image"
import LoginForm from "@/components/login-form"
import HomeNav from "@/components/home-nav"
import HomeFooter from "@/components/home-footer"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
      <HomeNav />

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0">
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome Back</h1>
              <p className="mt-3 text-gray-600">
                Sign in to your account to continue your journey with the Happiness Hub community.
              </p>
            </div>

            <LoginForm />

            <p className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-rose-600 hover:text-rose-500 underline-offset-4 hover:underline"
              >
                Sign up
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
                  alt="Login Illustration"
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="mt-8 space-y-4">
                <div className="bg-rose-50 rounded-lg p-4">
                  <h4 className="font-medium text-rose-800">Welcome Back!</h4>
                  <p className="text-gray-600 text-sm">Your community has been waiting for you</p>
                </div>
                <div className="bg-rose-50 rounded-lg p-4">
                  <h4 className="font-medium text-rose-800">New Updates</h4>
                  <p className="text-gray-600 text-sm">Check out the latest events and skills shared</p>
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
