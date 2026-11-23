import { createContext, useContext, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function useTheme() {
  const value = useContext(ThemeContext)
  if (!value) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }
  return value
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  function toggle() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

function ThemePanel() {
  return (
    <div className="theme-frame">
      <p>ThemePanel renders its child and passes no theme prop.</p>
      <ThemeStatus />
    </div>
  )
}

function ThemeStatus() {
  const { theme, toggle } = useTheme()

  return (
    <div className={theme === 'light' ? 'theme-panel light' : 'theme-panel dark'}>
      <p>ThemeStatus reads “{theme}” from context.</p>
      <button type="button" onClick={toggle}>
        Toggle theme
      </button>
    </div>
  )
}

export function ThemeDemo() {
  return (
    <section className="card">
      <h2>Context</h2>
      <p className="note">
        The provider holds the theme. Nested components read it with{' '}
        <code>useContext</code> instead of receiving it through props.
      </p>
      <ThemeProvider>
        <ThemePanel />
      </ThemeProvider>
    </section>
  )
}
