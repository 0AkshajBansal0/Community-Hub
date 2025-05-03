import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (v) => v.endsWith("@srmist.edu.in"),
      message: (props) => `${props.value} is not a valid SRM email address!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "/placeholder.svg?height=40&width=40",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model("User", userSchema)

export default User
