import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import Doctor from "../models/Doctor.js"

export const registerUser = async (req, res) => {
  try {
    const { name, phone, password, age, gender, role, specialization, experience } = req.body
    const hash = await bcrypt.hash(password, 10)

    let profile;
    if (role === 'doctor') {
      profile = await Doctor.create({
        name,
        phone,
        password: hash,
        specialization,
        experience
      })
    } else {
      profile = await User.create({
        name,
        phone,
        password: hash,
        age,
        gender
      })
    }

    const token = jwt.sign({ id: profile._id, role }, process.env.JWT_SECRET)

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    return res.status(201).json({
      message: "User registered successfully",
      role: profile.role || role,
      name: profile.name
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error registering user", error: err.message })
  }
}

export const loginUser = async (req, res) => {
  const { phone, password, role } = req.body

  let profile
  if (role === 'doctor') {
    profile = await Doctor.findOne({ phone })
  } else {
    profile = await User.findOne({ phone })
  }

  if (!profile) {
    return res.status(400).json({ message: "Account not found" })
  }

  const match = await bcrypt.compare(password, profile.password)
  if (!match) {
    return res.status(400).json({ message: "Invalid password" })
  }

  const token = jwt.sign({ id: profile._id, role }, process.env.JWT_SECRET)

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  })

  res.json({ role, name: profile.name })
}

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  })
  res.json({ message: "Logged out successfully" })
}