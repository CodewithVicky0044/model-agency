import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import contactRoutes from "./routes/contactRoutes.js"
import submissionRoutes from "./routes/submissionRoutes.js"

const app = express()

// Middleware
app.use(cors({
  origin: "https://model-agency-five.vercel.app",
  credentials: true
}))

app.use(express.json())

// Routes
app.use("/api", contactRoutes)
app.use("/api", submissionRoutes)

// Health Check Route
app.get("/", (req, res) => {
  res.send("Server running 🚀")
})

// Start Server
const PORT = process.env.PORT || 5000
app.listen(5000, () => {
  console.log(`Server started on port ${PORT}`)
})