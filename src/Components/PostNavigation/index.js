import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import { useQuery } from '@apollo/client'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

const NUMBER_LARGER_THAN_TOTAL_POST_COUNT = 1000

function getPreviousPost(posts, currentPostIndex) {
  if (currentPostIndex <= 0) {
    return null
  }
  return posts[currentPostIndex - 1]
}

function getNextPost(posts, currentPostIndex) {
  if (currentPostIndex < 0) {
    return null
  }
  if (currentPostIndex >= posts.length) {
    return null
  }
  return posts[currentPostIndex + 1]
}

function PostNavigation({ currentPost }) {
  const { data, loading } = useQuery(postsQuery, {
    variables: { page: 1, limit: NUMBER_LARGER_THAN_TOTAL_POST_COUNT },
  })
  const posts = data?.posts.data || []
  const currentPostIndex = posts.findIndex(post => post.id === currentPost.id)
  const previousPost = getPreviousPost(posts, currentPostIndex)
  const nextPost = getNextPost(posts, currentPostIndex)

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      {previousPost ? (
        <NavLink to={POST(previousPost.id)}>Previous Post</NavLink>
      ) : null}
      {nextPost ? <NavLink to={POST(nextPost.id)}>Next Post</NavLink> : null}
    </div>
  )
}

PostNavigation.propTypes = {
  currentPost: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
}

export default PostNavigation
