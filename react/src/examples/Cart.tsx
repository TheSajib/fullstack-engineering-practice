import { useReducer, useState } from 'react'

type CartItem = {
  id: number
  name: string
  qty: number
}

type CartAction =
  | { type: 'add'; item: CartItem }
  | { type: 'increment'; id: number }
  | { type: 'decrement'; id: number }
  | { type: 'remove'; id: number }
  | { type: 'clear' }

function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'add':
      return [...items, action.item]
    case 'increment':
      return items.map((item) =>
        item.id === action.id ? { ...item, qty: item.qty + 1 } : item,
      )
    case 'decrement':
      return items.map((item) =>
        item.id === action.id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item,
      )
    case 'remove':
      return items.filter((item) => item.id !== action.id)
    case 'clear':
      return []
  }
}

export function Cart() {
  const [items, dispatch] = useReducer(cartReducer, [])
  const [draft, setDraft] = useState('')
  const [nextId, setNextId] = useState(1)
  const total = items.reduce((sum, item) => sum + item.qty, 0)

  function addItem() {
    const name = draft.trim()
    if (!name) return

    dispatch({ type: 'add', item: { id: nextId, name, qty: 1 } })
    setNextId((current) => current + 1)
    setDraft('')
  }

  return (
    <section className="card">
      <h2>useReducer</h2>
      <p className="note">
        The text box is <code>useState</code>. The cart is{' '}
        <code>useReducer</code>: each button sends an action, and the reducer
        returns the next list. The total is calculated while rendering.
      </p>
      <form
        className="row"
        onSubmit={(event) => {
          event.preventDefault()
          addItem()
        }}
      >
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add an item"
          aria-label="Item name"
        />
        <button type="submit">Add</button>
        <button
          type="button"
          className="ghost"
          onClick={() => dispatch({ type: 'clear' })}
          disabled={items.length === 0}
        >
          Clear
        </button>
      </form>
      <p className="meta">{total} in the cart</p>
      <ul className="cart">
        {items.length === 0 ? (
          <li className="meta">The cart is empty.</li>
        ) : (
          items.map((item) => (
            <li key={item.id}>
              <span className="cart-name">{item.name}</span>
              <div className="row">
                <button
                  type="button"
                  className="ghost"
                  onClick={() => dispatch({ type: 'decrement', id: item.id })}
                  disabled={item.qty === 1}
                  aria-label={`Decrease ${item.name}`}
                >
                  −
                </button>
                <span>{item.qty}</span>
                <button
                  type="button"
                  className="ghost"
                  onClick={() => dispatch({ type: 'increment', id: item.id })}
                  aria-label={`Increase ${item.name}`}
                >
                  +
                </button>
                <button
                  type="button"
                  className="ghost"
                  onClick={() => dispatch({ type: 'remove', id: item.id })}
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  )
}
