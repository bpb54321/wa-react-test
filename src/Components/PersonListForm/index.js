import React, { useState } from 'react'

import faker from 'faker'
import { nanoid } from 'nanoid'

function PersonListForm() {
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])

  function handlePush() {
    setFields([{ name: faker.name.findName(), id: nanoid() }, ...fields])
  }

  return (
    <>
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
    </>
  )
}

export default PersonListForm
