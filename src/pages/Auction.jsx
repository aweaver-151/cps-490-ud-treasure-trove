import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function Auction() {
  const { id } = useParams()
  const [auction, setAuction] = useState(null)

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
  return (
    <div>
      <h1>{auction.title}</h1>
      <p>{auction.contents}</p>
      <p>Author: {auction.author?.username ?? auction.author}</p>
      <p>Tags: {(auction.tags ?? []).join(', ')}</p>
    </div>
  )
}
