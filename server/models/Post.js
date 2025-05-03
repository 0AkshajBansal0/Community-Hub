import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["skill", "event"],
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: function () {
      return this.type === "event"
    },
  },
  location: {
    type: String,
    required: function () {
      return this.type === "event"
    },
  },
  author: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "/placeholder.svg?height=40&width=40",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Post = mongoose.model("Post", postSchema)

export default Post
