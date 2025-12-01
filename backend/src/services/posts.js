import { Post } from '../db/models/post.js'
import { User } from '../db/models/user.js'
import { Bid } from '../db/models/bid.js'

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
  const bid = new Bid({
    postId,
    userId,
    amount,
    timestamp: new Date(),
  })
  await bid.save()

  await Post.findByIdAndUpdate(postId, {
    highestBid: amount,
  })

  return { postId, highestBid: amount }
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

export async function finalizeAuction(postId) {
  const post = await Post.findById(postId)
  if (!post) return

  const highest = await Bid.findOne({ postId }).sort({ amount: -1 })
  if (!highest) return

  const winner = await User.findById(highest.userId)
  const owner = await User.findById(post.author)

  if (!winner || !owner) return

  if (winner.points >= highest.amount) {
    winner.points -= highest.amount
    owner.points += highest.amount

    await winner.save()
    await owner.save()
  }

  post.finalized = true
  await post.save()
}
