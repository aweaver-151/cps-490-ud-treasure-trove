import { bidOnPost } from '../services/posts.js'
import { User } from '../db/models/user.js'

export async function placeBidController(req, res) {
  try {
    const userId = req.auth.sub
    const postId = req.params.postId
    const { amount } = req.body

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ error: 'Invalid bid amount' })
    }

    const result = await bidOnPost(userId, postId, amount)

    const io = req.app.get('io')
    const user = await User.findById(userId)
    io.emit('bidUpdated', {
      postId,
      amount,
      userId,
      username: user?.username || 'Unknown',
      timestamp: Date.now(),
    })

    return res.json(result)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}