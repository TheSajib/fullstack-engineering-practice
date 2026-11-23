import { Cart } from './examples/Cart.tsx'
import { Counter } from './examples/Counter.tsx'
import { ProfileForm } from './examples/ProfileForm.tsx'
import { Temperature } from './examples/Temperature.tsx'
import { ThemeDemo } from './examples/ThemeDemo.tsx'
import { TodoList } from './examples/TodoList.tsx'

export function App() {
  return (
    <main>
      <h1>React state practice</h1>
      <p className="lead">
        Six components, each storing state a different way. The source is in{' '}
        <code>src/examples</code>. Save a file and this page updates.
      </p>
      <Counter />
      <ProfileForm />
      <TodoList />
      <Temperature />
      <Cart />
      <ThemeDemo />
    </main>
  )
}
