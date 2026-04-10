import dotenv from "dotenv"
dotenv.config()   // 👈 sabse upar

import express from "express"
import cors from "cors"
import contactRoutes from "./routes/contactRoutes.js"
import submissionRoutes from "./routes/submissionRoutes.js"


const app = express()

// middleware
app.use(cors())
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