import React, { useEffect, useState } from 'react'

let globalCount

const INITIAL_COUNT = 0

function ClosureComponent() {
  const [count, setCount] = useState(INITIAL_COUNT)

  useEffect(() => {
    globalCount = INITIAL_COUNT
  }, [])

  function handleAlertClick() {
    setTimeout(() => {
      alert(`You clicked ${globalCount} times`)
    }, 2500)
  }

  function handleIncrementClick() {
    const incrementedCount = count + 1
    globalCount = incrementedCount
    setCount(incrementedCount)
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button type="button" onClick={handleIncrementClick}>
        Click me
      </button>
      <button type="button" onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  )
}

export default ClosureComponent
