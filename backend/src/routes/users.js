import {
  createUser,
  loginUser,
  getUserInfoById,
  deleteUser,
  editUser,
} from '../services/users.js'
import { requireAuth } from '../middleware/jwt.js'
import { User } from '../db/models/user.js'

export function userRoutes(app) {
  app.get('/api/v1/users/me', requireAuth, async (req, res) => {
    try {
      const user = await User.findById(req.auth.sub)
      if (!user) return res.status(404).json({ error: 'User not found' })
      return res.status(200).json({
        id: user._id,
        username: user.username,
        points: user.points
      })
    } catch (err) {
      return res.status(400).end()
    }
  })
  app.get('/api/v1/users/:id', async (req, res) => {
    const userInfo = await getUserInfoById(req.params.id)
    return res.status(200).send(userInfo)
  })

  app.post('/api/v1/user/login', async (req, res) => {
    try {
      const token = await loginUser(req.body)
      const user = await User.findOne({ username: req.body.username })
      return res.status(200).json({ token, points: user.points })
    } catch (err) {
      return res.status(400).json({
        error: 'login failed, did you enter the correct username/password?',
      })
    }
  })

  app.post('/api/v1/user/signup', async (req, res) => {
    try {
      const user = await createUser(req.body)
      return res.status(201).json({ username: user.username, points: user.points })
    } catch (err) {
      console.error('error adding user:', err)
      return res.status(400).json({
        error: 'failed to create the user, does the username already exist?',
      })
    }
  })
  app.delete('/api/v1/users/:id', requireAuth, async (req, res) => {
    try {
      const { deletedCount } = await deleteUser(req.params.id)
      if (deletedCount === 0) return res.sendStatus(404)
      return res.status(204).end()
    } catch (err) {
      console.error('error deleting user', err)
      return res.status(400).end()
    }
  })
  app.patch('/api/v1/users/me', requireAuth, async (req, res) => {
    try {
      const userId = req.auth.sub
      const { username, password } = req.body
      const updatedUser = await editUser(userId, { username, password })
      return res.status(200).json({ username: updatedUser.username })
    } catch (err) {
      console.error('error updating user', err)
      return res.status(400).end()
    }
  })
}
