import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import Doctor from "../models/Doctor.js"

export const registerUser = async (req, res) => {

  try {
    const { name, phone, password, age, gender, role, specialization, experience } = req.body
    const hash = await bcrypt.hash(password, 10)

    if (role === 'doctor') {
      const doctor = await Doctor.create({
        name,
        phone,
        password: hash,
        specialization,
        experience
      })
      return res.json(doctor)
    } else {
      const user = await User.create({
        name,
        phone,
        password: hash,
        age,
        gender
      })

      return res.json(user)
    }
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
  res.json({ token, role, name: profile.name })
}