import React, { useState } from 'react'

function FastRenderingTextInput() {
  const [value, setValue] = useState('')

  return (
    <div>
      <label>
        Enter something here:
        <br />
        <input
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      </label>
      <p>So fast...</p>
    </div>
  )
}

export default FastRenderingTextInput
