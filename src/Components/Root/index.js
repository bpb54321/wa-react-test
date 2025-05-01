import React, { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useQuery } from '@apollo/client'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

import { Column, Container, Post, PostAuthor, PostBody } from './styles'

import ClosureComponent from '../ClosureComponent'
import ExpensiveTree from '../ExpensiveTree'
import FastRenderingTextInput from '../FastRenderingTextInput'
import Pagination from '../Pagination'
import PersonListForm from '../PersonListForm'

const POSTS_QUERY_LIMIT = 10
const INITIAL_POSTS_PAGE = 1

const MemoizedExpensiveTree = memo(ExpensiveTree)

function Root() {
  const [postsPage, setPostsPage] = useState(INITIAL_POSTS_PAGE)
  const { data, loading } = useQuery(postsQuery, {
    variables: {
      page: postsPage,
      limit: POSTS_QUERY_LIMIT,
    },
  })

  const posts = data?.posts.data || []

  const handleNextPostsPageClick = () => {
    setPostsPage(currentPage => currentPage + 1)
  }

  const handlePreviousPostsPageClick = () => {
    setPostsPage(currentPage => currentPage - 1)
  }

  return (
    <Container>
      <Column>
        <h4>Need to add pagination</h4>
        {loading ? (
          'Loading...'
        ) : (
          <div>
            {posts.map(post => (
              <Post key={post.id} mx={4}>
                <NavLink to={POST(post.id)}>{post.title}</NavLink>
                <PostAuthor>by {post.user.name}</PostAuthor>
                <PostBody>{post.body}</PostBody>
              </Post>
            ))}
            <Pagination
              currentPage={postsPage}
              initialPostsPage={INITIAL_POSTS_PAGE}
              limit={POSTS_QUERY_LIMIT}
              totalCount={data?.posts.meta.totalCount}
              onNext={handleNextPostsPageClick}
              onPrevious={handlePreviousPostsPageClick}
            />
          </div>
        )}
      </Column>
      <Column>
        <h4>Slow rendering - Fixed!</h4>
        <FastRenderingTextInput />
        <MemoizedExpensiveTree />

        <h4>Closures? - Fixed!</h4>
        <ClosureComponent />
      </Column>

      <Column>
        <h4>Incorrect form field behavior</h4>
        <PersonListForm />
      </Column>
    </Container>
  )
}

export default Root
