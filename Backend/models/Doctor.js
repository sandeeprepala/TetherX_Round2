import mongoose from "mongoose"

const DoctorSchema = new mongoose.Schema({

  name: String,

  phone: String,

  specialization: String,

  experience: Number,

  password: String

}, { timestamps: true })

export default mongoose.model("Doctor", DoctorSchema)