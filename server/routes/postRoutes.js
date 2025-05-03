import express from "express"
import Post from "../models/Post.js"

const router = express.Router()

// Get all posts
router.get("/", async (req, res) => {
  try {
    console.log("Fetching all posts")
    const posts = await Post.find().sort({ createdAt: -1 })
    res.json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Create a new post
router.post("/", async (req, res) => {
  try {
    const { type, title, description, category, date, location, author } = req.body

    console.log("Creating new post:", { type, title, category })

    // Validate required fields
    if (!type || !title || !description || !category || !author) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    // Validate event-specific fields
    if (type === "event" && (!date || !location)) {
      return res.status(400).json({ message: "Events require date and location" })
    }

    // Create new post
    const newPost = new Post({
      type,
      title,
      description,
      category,
      date,
      location,
      author,
    })

    await newPost.save()
    console.log("Post created successfully:", newPost._id)

    res.status(201).json(newPost)
  } catch (error) {
    console.error("Error creating post:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get posts by type (skill or event)
router.get("/type/:type", async (req, res) => {
  try {
    const { type } = req.params

    console.log("Fetching posts by type:", type)

    if (type !== "skill" && type !== "event") {
      return res.status(400).json({ message: "Invalid post type" })
    }

    const posts = await Post.find({ type }).sort({ createdAt: -1 })
    res.json(posts)
  } catch (error) {
    console.error("Error fetching posts by type:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get posts by category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params

    console.log("Fetching posts by category:", category)

    const posts = await Post.find({ category }).sort({ createdAt: -1 })
    res.json(posts)
  } catch (error) {
    console.error("Error fetching posts by category:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

export default router
