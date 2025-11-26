import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { usePoints } from '../contexts/PointsContext.jsx'

export function Auction() {
  const { id } = useParams()
  const [auction, setAuction] = useState(null)
  const { userPoints, setUserPoints } = usePoints()

  useEffect(() => {
    async function load() {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}posts/${id}`)
      const data = await res.json()
      setAuction(data)
    }
    load()
  }, [id])
  if (!auction) {
    return <div>Loading...</div>
  }

  const handleBid = () => {
    if (userPoints >= 100) {
      setUserPoints(userPoints - 100)
      console.log(`Bid placed on: ${auction.title}`)
    } else {
      console.log('Not enough points to bid!')
    }
  }

  return (
    <div>
      <h1>{auction.title}</h1>
      <p>{auction.contents}</p>
      <p>Author: {auction.author?.username ?? auction.author}</p>
      <p>Tags: {(auction.tags ?? []).join(', ')}</p>
      <div className='mt-4'>
        <button
          onClick={handleBid}
          className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
        >
          Bid
        </button>
      </div>
    </div>
  )
}
