import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { usePoints } from '../contexts/PointsContext.jsx'

export function Post({ title, contents, author }) {
  const { userPoints, setUserPoints } = usePoints()

  const handleBid = () => {
    if (userPoints >= 100) {
      setUserPoints(userPoints - 100)
      console.log(`Bid placed on: ${title}`)
    } else {
      console.log('Not enough points to bid!')
    }
  }

  return (
    <article className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-2'>
      <h3 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
        {title}
      </h3>
      <div className='font-normal text-gray-700 dark:text-gray-400'>
        {contents}
      </div>
      {author && (
        <em>
          <br />
          Item Owned by <User id={author} />
        </em>
      )}
      <div className='mt-4'>
        <button
          onClick={handleBid}
          className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
        >
          Bid
        </button>
      </div>
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
}