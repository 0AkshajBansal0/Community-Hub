"use client"

// This is a client-side mock authentication service
// In a real application, you would use a proper authentication service

let currentUser = null

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Initialize from localStorage if available
if (isBrowser) {
  try {
    const storedUser = localStorage.getItem("happiness_hub_user")
    if (storedUser) {
      currentUser = JSON.parse(storedUser)
    }
  } catch (error) {
    console.error("Error loading user from localStorage:", error)
  }
}

export async function signIn(email, password) {
  // Validate email domain
  if (!email.endsWith("@srmist.edu.in")) {
    throw new Error("Only @srmist.edu.in email addresses are allowed")
  }

  // In a real app, you would validate credentials against a backend
  // For this demo, we'll just create a user object
  currentUser = {
    id: Date.now().toString(),
    email,
    createdAt: new Date().toISOString(),
  }

  // Store in localStorage for persistence
  if (isBrowser) {
    localStorage.setItem("happiness_hub_user", JSON.stringify(currentUser))
  }

  return currentUser
}

export async function signOut() {
  currentUser = null

  // Clear from localStorage
  if (isBrowser) {
    localStorage.removeItem("happiness_hub_user")
  }
}

export async function getSession() {
  return currentUser
}

export function getUser() {
  return currentUser
}
