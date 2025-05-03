import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "sonner"
import HomePage from "./page"
import SignInPage from "./signin/page"
import SignUpPage from "./signup/page"
import CommunityPage from "./community/page"
import AddSkillPage from "./add-skill/page"
import AddEventPage from "./add-event/page"
import Navbar from "./components/navbar"
import "./globals.css"

export default function RootLayout() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Happiness Community Hub</title>
        <meta
          name="description"
          content="A community platform for SRM students to share skills, organize events, and build meaningful connections."
        />
      </head>
      <body>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/add-skill" element={<AddSkillPage />} />
            <Route path="/add-event" element={<AddEventPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-right" richColors />
        </Router>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
