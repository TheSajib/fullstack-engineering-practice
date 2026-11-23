import { useState } from 'react'

type Todo = {
  id: number
  text: string
  done: boolean
}

type Filter = 'all' | 'open' | 'done'

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open' },
  { id: 'done', label: 'Done' },
]

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn useState', done: true },
    { id: 2, text: 'Update arrays by copying them', done: false },
  ])
  const [text, setText] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [nextId, setNextId] = useState(3)

  const remaining = todos.filter((todo) => !todo.done).length
  const visible = todos.filter((todo) => {
    if (filter === 'open') return !todo.done
    if (filter === 'done') return todo.done
    return true
  })

  function addTodo() {
    const trimmed = text.trim()
    if (!trimmed) return

    setTodos((current) => [
      ...current,
      { id: nextId, text: trimmed, done: false },
    ])
    setNextId((current) => current + 1)
    setText('')
  }

  function toggleTodo(id: number) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    )
  }

  function removeTodo(id: number) {
    setTodos((current) => current.filter((todo) => todo.id !== id))
  }

  return (
    <section className="card">
      <h2>List state</h2>
      <p className="note">
        The array is state. The open count and the rows on screen are
        calculated from that array while rendering.
      </p>
      <form
        className="row"
        onSubmit={(event) => {
          event.preventDefault()
          addTodo()
        }}
      >
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Add a task"
          aria-label="Task"
        />
        <button type="submit">Add</button>
      </form>
      <p className="meta">{remaining} still open</p>
      <div className="row">
        {filters.map((option) => (
          <button
            key={option.id}
            type="button"
            className={filter === option.id ? undefined : 'ghost'}
            aria-pressed={filter === option.id}
            onClick={() => setFilter(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <ul className="todos">
        {visible.length === 0 ? (
          <li className="meta">Nothing in this view.</li>
        ) : (
          visible.map((todo) => (
            <li key={todo.id}>
              <label className={todo.done ? 'todo done' : 'todo'}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span>{todo.text}</span>
              </label>
              <button
                type="button"
                className="ghost"
                onClick={() => removeTodo(todo.id)}
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  )
}
