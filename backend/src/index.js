import { app } from './app.js'
import dotenv from 'dotenv'
import { initDatabase } from './db/init.js'
import { createServer } from 'http'
import { Server } from 'socket.io'

dotenv.config()

try {
  await initDatabase()
  const PORT = process.env.PORT

  const server = createServer(app)
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  })

  app.set('io', io)

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id)
    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id)
    })
  })

  server.listen(PORT)
  console.info(`Server + Socket.IO running on http://localhost:${PORT}`)
} catch (err) {
  console.error('error connecting to database:', err)
}
