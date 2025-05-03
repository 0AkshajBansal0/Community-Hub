// This file provides an alternative way to start the server
// It uses CommonJS syntax which might be more compatible with some Node.js setups
require("dotenv").config()
const { spawn } = require("child_process")

console.log("Starting server with Node.js ESM support...")
console.log("MongoDB URI:", process.env.MONGODB_URI ? "Found" : "Not found")
console.log("PORT:", process.env.PORT || "5000 (default)")

const server = spawn("node", ["--experimental-modules", "server/index.js"], {
  stdio: "inherit",
  env: process.env,
})

server.on("error", (err) => {
  console.error("Failed to start server:", err)
})

process.on("SIGINT", () => {
  console.log("Stopping server...")
  server.kill("SIGINT")
  process.exit(0)
})
