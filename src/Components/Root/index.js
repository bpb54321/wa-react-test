import React, { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import faker from 'faker'
import { nanoid } from 'nanoid'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

import { Column, Container, Post, PostAuthor, PostBody } from './styles'

import ClosureComponent from '../ClosureComponent'
import ExpensiveTree from '../ExpensiveTree'
import FastRenderingTextInput from '../FastRenderingTextInput'
import Pagination from '../Pagination'

const POSTS_QUERY_LIMIT = 10
const INITIAL_POSTS_PAGE = 1

const MemoizedExpensiveTree = memo(ExpensiveTree)

function Root() {
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])

  const [postsPage, setPostsPage] = useState(INITIAL_POSTS_PAGE)
  const { data, loading } = useQuery(postsQuery, {
    variables: {
      page: postsPage,
      limit: POSTS_QUERY_LIMIT,
    },
  })

  function handlePush() {
    setFields([{ name: faker.name.findName(), id: nanoid() }, ...fields])
  }

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

        <h4>Closures?</h4>
        <ClosureComponent />
      </Column>

      <Column>
        <h4>Incorrect form field behavior</h4>
        <button type="button" onClick={handlePush}>
          Add more
        </button>
        <ol>
          {fields.map((field, index) => (
            <li key={index}>
              {field.name}:<br />
              <input type="text" />
            </li>
          ))}
        </ol>
      </Column>
    </Container>
  )
}

export default Root
