import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import { useQuery } from '@apollo/client'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

const NUMBER_LARGER_THAN_TOTAL_POST_COUNT = 1000

function getPreviousPost(posts, currentPost) {
  return {
    __typename: 'Post',
    id: '1',
  }
}

function getNextPost(posts, currentPost) {
  return {
    __typename: 'Post',
    id: '3',
  }
}

function PostNavigation({ currentPost }) {
  const { data, loading } = useQuery(postsQuery, {
    variables: { page: 1, limit: NUMBER_LARGER_THAN_TOTAL_POST_COUNT },
  })
  const posts = data?.posts.data || []
  const postIndex = posts.findIndex(post => post.id === currentPost.id)
  const previousPost = postIndex >= 0 ? getPreviousPost() : null
  const nextPost = postIndex >= 0 ? getNextPost() : null

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
