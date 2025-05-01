import React, { useState } from 'react'
import PropTypes from 'prop-types'

import faker from 'faker'
import { nanoid } from 'nanoid'

function PersonForm({ field }) {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <li>
      {isEditing ? (
        <form
          onSubmit={event => {
            event.preventDefault()
            setIsEditing(false)
          }}
        >
          <input type="text" />
          <button type="submit">Update</button>
        </form>
      ) : (
        <div>
          <span>{field.name}</span>
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>
      )}
    </li>
  )
}

PersonForm.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

function PersonListForm() {
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])

  function handlePush() {
    setFields([...fields, { name: faker.name.findName(), id: nanoid() }])
  }

  return (
    <>
      <button type="button" onClick={handlePush}>
        Add more
      </button>
      <ol>
        {fields.map((field, index) => (
          <PersonForm field={field} key={index} />
        ))}
      </ol>
    </>
  )
}

export default PersonListForm
