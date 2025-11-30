import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Post } from './Post.jsx'

export function PostList({ posts = [] }) {
  return (
    <div className='flex flex-wrap justify-center'>
      {posts.map((post) => (
        <Fragment key={post._id}>
          <Post
            id={post._id}
            title={post.title}
            contents={post.contents}
            author={post.author}
            imagepath={post.imagepath}
            enddate={new Date(post.enddate)}
          />
        </Fragment>
      ))}
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      contents: PropTypes.string,
      author: PropTypes.string,
    }),
  ).isRequired,
}
