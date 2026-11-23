import { useState } from 'react'

function toCelsius(fahrenheit: number) {
  return ((fahrenheit - 32) * 5) / 9
}

function toFahrenheit(celsius: number) {
  return (celsius * 9) / 5 + 32
}

function convert(value: string, convertValue: (value: number) => number) {
  if (value.trim() === '') return ''

  const number = Number(value)
  if (Number.isNaN(number)) return ''

  return String(Math.round(convertValue(number) * 100) / 100)
}

type ScaleInputProps = {
  label: string
  value: string
  onChange: (value: string) => void
}

function ScaleInput({ label, value, onChange }: ScaleInputProps) {
  return (
    <label>
      {label}
      <input
        inputMode="decimal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

export function Temperature() {
  const [value, setValue] = useState('')
  const [scale, setScale] = useState<'c' | 'f'>('c')

  const celsius = scale === 'f' ? convert(value, toCelsius) : value
  const fahrenheit = scale === 'c' ? convert(value, toFahrenheit) : value

  return (
    <section className="card">
      <h2>Lifting state</h2>
      <p className="note">
        Both inputs are views of one value stored here. A child reports the
        next string, and this parent decides which scale it belongs to.
      </p>
      <div className="stack">
        <ScaleInput
          label="Celsius"
          value={celsius}
          onChange={(next) => {
            setScale('c')
            setValue(next)
          }}
        />
        <ScaleInput
          label="Fahrenheit"
          value={fahrenheit}
          onChange={(next) => {
            setScale('f')
            setValue(next)
          }}
        />
      </div>
    </section>
  )
}
