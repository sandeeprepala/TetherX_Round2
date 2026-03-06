import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import connectDB from "./config/db.js"

import authRoutes from "./routes/authRoutes.js"
import caseRoutes from "./routes/caseRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use("/api/auth",authRoutes)

app.use("/api/cases",caseRoutes)

app.get("/",(req,res)=>{
  res.send("AI Triage API Running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
  console.log(`Server running on ${PORT}`)
})