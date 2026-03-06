import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import Doctor from "../models/Doctor.js"

export const registerUser = async(req,res)=>{

  try{

    const {name,phone,password,age,gender} = req.body

    const hash = await bcrypt.hash(password,10)

    const user = await User.create({
      name,
      phone,
      password:hash,
      age,
      gender
    })

    res.json(user)

  }catch(err){
    res.status(500).json(err)
  }

}

export const loginUser = async(req,res)=>{

  const {phone,password} = req.body

  const user = await User.findOne({phone})

  if(!user){
    return res.status(400).json({message:"User not found"})
  }

  const match = await bcrypt.compare(password,user.password)

  if(!match){
    return res.status(400).json({message:"Invalid password"})
  }

  const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
  res.json({message:"Login successful"})

}