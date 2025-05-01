import React, { useState } from 'react'
import PropTypes from 'prop-types'

import faker from 'faker'
import { nanoid } from 'nanoid'

function PersonForm({ field, onUpdateName }) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(field.name)

  const handleNameChange = event => {
    setName(event.target.value)
  }

  return (
    <li>
      {isEditing ? (
        <form
          onSubmit={event => {
            event.preventDefault()
            setIsEditing(false)
            onUpdateName(field.id, name)
          }}
        >
          <label htmlFor={`name-input-${field.id}`}>Name: </label>
          <input
            id={`name-input-${field.id}`}
            type="text"
            value={name}
            onChange={handleNameChange}
          />
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
  onUpdateName: PropTypes.func.isRequired,
}

function PersonList() {
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])

  function handlePush() {
    setFields([...fields, { name: faker.name.findName(), id: nanoid() }])
  }

  function handleUpdateName(personId, newName) {
    const newFields = fields.map(field => {
      if (field.id === personId) {
        return {
          ...field,
          name: newName,
        }
      }
      return { ...field }
    })
    setFields(newFields)
  }

  return (
    <>
      <button type="button" onClick={handlePush}>
        Add more
      </button>
      <ol>
        {fields.map((field, index) => (
          <PersonForm
            field={field}
            key={index}
            onUpdateName={handleUpdateName}
          />
        ))}
      </ol>
    </>
  )
}

export default PersonList
