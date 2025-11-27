import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { Link } from 'react-router-dom'

export function Post({ id, title, contents, author, imagepath }) {
  return (
    <article className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-2'>
      <img src={import.meta.env.VITE_IMAGE_URL + imagepath} alt='' />
      <Link to={`/auction/${id}`}>
        <h3 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {title}
        </h3>
      </Link>
      <div className='font-normal text-gray-700 dark:text-gray-400'>
        {contents}
      </div>
      {author && (
        <em>
          <br />
          Item Owned by <User id={author} />
        </em>
      )}
    </article>
  )
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  imagepath: PropTypes.string,
}
