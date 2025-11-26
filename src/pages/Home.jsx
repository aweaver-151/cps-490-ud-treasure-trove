export function Home() {
  return (
    <div className='min-h-screen bg-slate-950 text-white overflow-hidden'>
      <div className='max-w-4xl mx-auto px-4 pt-20 text-center'>
        <h1 className="text-6xl font-bold mb-6 text-white">
          Treasure Trove
        </h1>
        <p className="text-xl text-slate-300 mb-12">
          Discover unique items, place your bids, and win amazing treasures.
        </p>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-slate-900 rounded-lg p-6'>
            <h3 className='text-xl font-semibold mb-2'>Browse Auctions</h3>
            <p className='text-slate-400'>Explore hundreds of live auctions</p>
          </div>
          <div className='bg-slate-900 rounded-lg p-6'>
            <h3 className='text-xl font-semibold mb-2'>Place Bids</h3>
            <p className='text-slate-400'>Compete for your favorite items</p>
          </div>
          <div className='bg-slate-900 rounded-lg p-6'>
            <h3 className='text-xl font-semibold mb-2'>Win & Collect</h3>
            <p className='text-slate-400'>Build your unique collection</p>
          </div>
        </div>
      </div>
    </div>
  )
}
