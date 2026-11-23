import { useState } from 'react'

type Profile = {
  name: string
  city: string
}

export function ProfileForm() {
  const [profile, setProfile] = useState<Profile>({
    name: 'Ada',
    city: 'London',
  })

  function updateField(field: keyof Profile, value: string) {
    setProfile((current) => ({ ...current, [field]: value }))
  }

  return (
    <section className="card">
      <h2>Object state</h2>
      <p className="note">
        Each keystroke saves a new object. The field you did not edit is copied
        onto that object.
      </p>
      <div className="stack">
        <label>
          Name
          <input
            value={profile.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
        </label>
        <label>
          City
          <input
            value={profile.city}
            onChange={(event) => updateField('city', event.target.value)}
          />
        </label>
      </div>
      <pre className="state">{JSON.stringify(profile, null, 2)}</pre>
    </section>
  )
}
