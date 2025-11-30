import express from 'express'
import bodyParser from 'body-parser'
import { postsRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  )
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  next()
})

postsRoutes(app)
userRoutes(app)

app.use(express.static('public'))

const clientDist = path.resolve(__dirname, '../..', 'frontend', 'dist')

app.use(express.static(clientDist))

app.get('*', (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'))
})

export { app }
