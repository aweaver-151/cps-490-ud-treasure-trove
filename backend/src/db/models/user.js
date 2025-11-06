import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: Number, default: 1000 },
})

export const User = mongoose.model('user', userSchema)