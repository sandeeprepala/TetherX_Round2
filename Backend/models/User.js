import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: String,

  phone: String,

  password: String,

  age: Number,

  gender: String

}, { timestamps: true })

export default mongoose.model("User", UserSchema)