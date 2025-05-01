import React, { useEffect, useState } from 'react'

const INITIAL_COUNT = 0

export function makeClosureComponent() {
  let externalCount

  const ClosureComponent = () => {
    const [count, setCount] = useState(INITIAL_COUNT)

    useEffect(() => {
      externalCount = INITIAL_COUNT
    }, [])

    function handleAlertClick() {
      setTimeout(() => {
        alert(`You clicked ${externalCount} times`)
      }, 2500)
    }

    function handleIncrementClick() {
      const incrementedCount = count + 1
      externalCount = incrementedCount
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

  return ClosureComponent
}
