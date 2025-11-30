import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { usePoints } from '../contexts/PointsContext.jsx'
import { User } from '../components/User.jsx'
import { Countdown } from 'react-countdown'

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

  const enddate = new Date(auction.enddate)

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
          End Date: {enddate.toLocaleDateString() ?? ''} End Time:{' '}
          {enddate.toLocaleTimeString() ?? ''}
        </p>
        <Countdown date={enddate} />
        <p>Tags: {(auction.tags ?? []).join(', ')}</p>
        <div className='mt-4'>
          <button
            onClick={handleBid}
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            Bid
          </button>
        </div>
      </article>
    </div>
  )
}
