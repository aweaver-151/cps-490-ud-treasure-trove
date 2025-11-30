import { Post } from '../db/models/post.js'
import { User } from '../db/models/user.js'
import { Bid } from '../db/models/bid.js'
import { deductPoints } from '../services/users.js'

export async function createPost(
  userId,
  { title, contents, imagepath, enddate, tags },
) {
  const post = new Post({
    title,
    author: userId,
    contents,
    imagepath,
    enddate,
    tags,
  })
  return await post.save()
}

async function listPosts(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Post.find({
    ...query,
    enddate: { $gt: new Date() },
  }).sort({ [sortBy]: sortOrder })
}

export async function listAllPosts(options) {
  return await listPosts({}, options)
}

export async function listPostsByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listPosts({ author: user._id }, options)
}

export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options)
}

export async function getPostById(postID) {
  return await Post.findById(postID)
}

export async function updatePost(userId, postID, { title, contents, tags }) {
  return await Post.findOneAndUpdate(
    { _id: postID, author: userId },
    { $set: { title, contents, tags } },
    { new: true },
  )
}

export async function deletePost(userId, postId) {
  return await Post.deleteOne({ _id: postId, author: userId })
}

export async function bidOnPost(userId, postId, amount) {
  const remainingPoints = await deductPoints(userId, amount)

  await Post.findByIdAndUpdate(postId, {
    highestBid: amount,
  })

  const bid = new Bid({
    postId,
    userId,
    amount,
    timestamp: new Date(),
  })
  await bid.save()

  return { postId, remainingPoints, highestBid: amount }
}

export async function getBidHistory(postId) {
  const bids = await Bid.find({ postId })
    .sort({ timestamp: 1 })
    .populate('userId', 'username')

  return bids.map((bid) => ({
    postId: bid.postId,
    userId: bid.userId._id.toString(),
    username: bid.userId.username,
    amount: bid.amount,
    timestamp: bid.timestamp,
  }))
}

export async function getHighestBid(postId) {
  const highest = await Bid.findOne({ postId }).sort({ amount: -1 })
  return highest ? highest.amount : 0
}
