import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import faker from 'faker'
import { nanoid } from 'nanoid'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

import { Column, Container, Post, PostAuthor, PostBody } from './styles'

import ExpensiveTree from '../ExpensiveTree'

const POSTS_QUERY_LIMIT = 10
const INITIAL_POSTS_PAGE = 1

function Root() {
  const [count, setCount] = useState(0)
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])

  const [value, setValue] = useState('')

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

  function handleAlertClick() {
    setTimeout(() => {
      alert(`You clicked ${count} times`)
    }, 2500)
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
                <NavLink href={POST(post.id)} to={POST(post.id)}>
                  {post.title}
                </NavLink>
                <PostAuthor>by {post.user.name}</PostAuthor>
                <PostBody>{post.body}</PostBody>
              </Post>
            ))}
            {postsPage > INITIAL_POSTS_PAGE ? (
              <button type="button" onClick={handlePreviousPostsPageClick}>
                Previous Page
              </button>
            ) : null}
            {postsPage * POSTS_QUERY_LIMIT < data?.posts.meta.totalCount ? (
              <button type="button" onClick={handleNextPostsPageClick}>
                Next Page
              </button>
            ) : null}
          </div>
        )}
      </Column>
      <Column>
        <h4>Slow rendering</h4>
        <label>
          Enter something here:
          <br />
          <input
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />
        </label>
        <p>So slow...</p>
        <ExpensiveTree />

        <h4>Closures?</h4>
        <p>You clicked {count} times</p>
        <button type="button" onClick={() => setCount(count + 1)}>
          Click me
        </button>
        <button type="button" onClick={handleAlertClick}>
          Show alert
        </button>
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
