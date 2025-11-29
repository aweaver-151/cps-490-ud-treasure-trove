import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../db/models/user.js'
import { Post } from '../db/models/post.js'

export async function loginUser({ username, password }) {
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error('invalid username!')
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new Error('invalid password!')
  }
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })
  return token
}

export async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({ username, password: hashedPassword })
  return await user.save()
}

export async function getUserInfoById(userId) {
  try {
    const user = await User.findById(userId)
    if (!user) return { username: userId }
    return { username: user.username }
  } catch (err) {
    return { username: userId }
  }
}

export async function deleteUser(userId) {
  await Post.deleteMany({ author: userId })
  return await User.deleteOne({ _id: userId })
}

export async function deductTokens(userId, amount) {
  const user = await User.findById(userId)
  if (!user) {
    throw new Error('User not found')
  }

  if (user.tokens < amount) {
    throw new Error('Not enough points')
  }

  user.tokens -= amount
  await user.save()

  return user.tokens
}

export async function editUser(userId, { username, password }) {
  const user = await User.findById(userId)
  if (!user) {
    throw new Error('User not found')
  }
  if (username) {
    user.username = username
  }
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword
  }
  const savedUser = await user.save()
  return { id: savedUser._id, username: savedUser.username }
}
