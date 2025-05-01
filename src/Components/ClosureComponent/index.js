import React, { useState } from 'react'

function ClosureComponent() {
  const [count, setCount] = useState(0)

  function handleAlertClick() {
    setTimeout(() => {
      alert(`You clicked ${count} times`)
    }, 2500)
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button type="button" onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  )
}

export default ClosureComponent
