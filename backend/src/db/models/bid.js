import mongoose, { Schema } from 'mongoose'

const bidSchema = new Schema({
  postId: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
})

bidSchema.index({ postId: 1, timestamp: -1 })

export const Bid = mongoose.model('bid', bidSchema)