import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  function addThreeFromThisRender() {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
  }

  function addThreeFromLatest() {
    setCount((current) => current + 1)
    setCount((current) => current + 1)
    setCount((current) => current + 1)
  }

  return (
    <section className="card">
      <h2>useState</h2>
      <p className="note">
        The count is state. Updates that read <code>count</code> share this
        render, so three of them still add 1. Updates that receive the latest
        value run in order, so three of them add 3.
      </p>
      <p className="figure">{count}</p>
      <div className="row">
        <button type="button" onClick={() => setCount((current) => current + 1)}>
          Add 1
        </button>
        <button type="button" onClick={addThreeFromThisRender}>
          Add 3 from this render
        </button>
        <button type="button" onClick={addThreeFromLatest}>
          Add 3 from the latest value
        </button>
        <button type="button" className="ghost" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </section>
  )
}
