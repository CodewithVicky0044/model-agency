import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import contactRoutes from "./routes/contactRoutes.js"
import submissionRoutes from "./routes/submissionRoutes.js"

const app = express()

// ✅ CORS FIX (IMPORTANT)
app.use(cors({
  origin: [
    "https://runwaydreams.in",
    "https://www.runwaydreams.in",
    "https://model-agency-five.vercel.app"
  ],
  methods: ["GET", "POST"],
  credentials: true
}))

// middleware
app.use(express.json())

// routes
app.use("/api", contactRoutes)
app.use("/api", submissionRoutes)

// test route
app.get("/", (req, res) => {
  res.send("Server running 🚀")
})

// server start
app.listen(5000, () => {
  console.log("Server started on port 5000")
})