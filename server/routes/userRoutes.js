import express from "express"
import bcrypt from "bcrypt"
import User from "../models/User.js"

const router = express.Router()

// Sign up route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body

    console.log("Signup attempt:", { name, email })

    // Validate email domain
    if (!email.endsWith("@srmist.edu.in")) {
      return res.status(400).json({ message: "Only @srmist.edu.in email addresses are allowed" })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    await newUser.save()
    console.log("User created successfully:", email)

    res.status(201).json({ message: "User created successfully" })
  } catch (error) {
    console.error("Signup error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Sign in route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body

    console.log("Login attempt:", email)

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Return user data (excluding password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    }

    console.log("User logged in successfully:", email)
    res.json({ user: userData })
  } catch (error) {
    console.error("Signin error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

export default router
