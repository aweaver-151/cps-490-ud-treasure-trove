import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { usePoints } from '../contexts/PointsContext.jsx'
import { User } from '../components/User.jsx'
import { io } from 'socket.io-client'
import { jwtDecode } from 'jwt-decode'

export function Auction() {
  const { id } = useParams()
  const [auction, setAuction] = useState(null)

  const [bidAmount, setBidAmount] = useState('')
  const [highestBid, setHighestBid] = useState(0)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [bidHistory, setBidHistory] = useState([])

  const { userPoints, setUserPoints } = usePoints()

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}posts/${id}`,
        )
        const data = await res.json()
        setAuction(data)
        setHighestBid(data.highestBid || 0)

        const bidsRes = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}posts/${id}/bids`,
        )
        if (bidsRes.ok) {
          const bidsData = await bidsRes.json()
          setBidHistory(bidsData)
        }
      } catch (error) {
        console.error('Error loading auction:', error)
      }
    }

    load()
  }, [id])

  useEffect(() => {
    const socket = io(import.meta.env.VITE_BACKEND_URL.replace('/api/v1/', ''))

    socket.on('bidUpdated', (data) => {
      if (data.postId === id) {
        setHighestBid(data.amount)
        setBidHistory((prev) => [
          ...prev,
          {
            postId: data.postId,
            userId: data.userId,
            username: data.username,
            amount: data.amount,
            timestamp: data.timestamp,
          },
        ])
      }
    })

    return () => socket.disconnect()
  }, [id])

  useEffect(() => {
    if (!message) return

    const timer = setTimeout(() => {
      setMessage('')
    }, 3000)

    return () => clearTimeout(timer)
  }, [message])

  if (!auction) {
    return <div>Loading...</div>
  }

  const handleBid = async () => {
    setMessage('')
    setError('')

    const amount = Number(bidAmount)

    if (!amount || amount <= 0) {
      setError('Please enter a valid bid amount.')
      return
    }

    if (amount <= highestBid) {
      setError(
        `Your bid must be higher than the current highest bid (${highestBid}).`,
      )
      return
    }

    if (userPoints < amount) {
      setError('Not enough points to place this bid.')
      return
    }

    const token = localStorage.getItem('authToken')

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}posts/${id}/bid`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      },
    )

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      return
    }

    setUserPoints(data.remainingPoints)
    setHighestBid(amount)
    setMessage('Bid placed successfully!')
    setBidAmount('')
  }

  const enddate = new Date(auction.enddate)
  const token = localStorage.getItem('authToken')
  let currentUserId = null

  if (token) {
    const decoded = jwtDecode(token)
    currentUserId = decoded.sub
  }

  const isOwner = auction.author === currentUserId
  return (
    <div className='flex items-center justify-center h-screen'>
      <article className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-2 min-w-[300px] min-h-[350px]'>
        <img src={import.meta.env.VITE_IMAGE_URL + auction.imagepath} alt='' />

        <h1 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {auction.title}
        </h1>

        <p>{auction.contents}</p>

        <p>
          Owner: <User id={auction.author} />
        </p>

        <p>
          End Date: {enddate.toLocaleDateString()}
          <br />
          End Time: {enddate.toLocaleTimeString()}
        </p>

        <p>Tags: {(auction.tags ?? []).join(', ')}</p>

        <p className='mt-3'>
          <strong>Current Highest Bid:</strong> {highestBid}
        </p>

        {!isOwner && (
          <>
            <input
              type='text'
              inputMode='numeric'
              pattern='[0-9]*'
              placeholder='Enter your bid'
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className='mt-2 p-2 border rounded w-full'
            />
            <div className='mt-4'>
              <button
                onClick={handleBid}
                className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full'
              >
                Place Bid
              </button>
            </div>
          </>
        )}

        {message && <p className='text-white mt-2'>{message}</p>}
        {error && <p className='text-red-600 mt-2'>{error}</p>}

        <h2 className='mt-4 text-lg font-bold text-white'>Bid History</h2>

        <div className='max-h-40 overflow-y-auto mt-2'>
          {bidHistory.length === 0 ? (
            <p className='text-gray-300 text-sm'>No bids yet.</p>
          ) : (
            bidHistory.map((bid, index) => (
              <p key={index} className='text-white text-sm'>
                {bid.username ?? `User ${bid.userId?.slice(-4)}`} –{' '}
                <span className="className='text-white' font-semibold">
                  {bid.amount}
                </span>
              </p>
            ))
          )}
        </div>
      </article>
    </div>
  )
}
