'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Axolotl } from '@/types'

interface Props {
  axolotls: Axolotl[]
  preselectedId: string
}

export default function ReserveForm({ axolotls, preselectedId }: Props) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [axolotlId, setAxolotlId] = useState(preselectedId || axolotls[0]?.id || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const selected = axolotls.find(a => a.id === axolotlId)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim() || !axolotlId) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, axolotlId }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
      } else {
        router.push(`/reserve/success?name=${encodeURIComponent(selected?.name ?? '')}`)
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Axolotl picker */}
      <div>
        <label className="label">Choose Your Axolotl</label>
        <select
          value={axolotlId}
          onChange={e => setAxolotlId(e.target.value)}
          className="input"
          required
        >
          {axolotls.map(a => (
            <option key={a.id} value={a.id}>
              {a.name} — {a.morph} · {a.age} · {a.weight}
            </option>
          ))}
        </select>
        {selected && (
          <div className="mt-3 p-3 bg-teal-50 border border-teal-100 rounded-lg flex gap-3 items-start">
            <div className="text-3xl">🦎</div>
            <div>
              <p className="font-semibold text-teal-800">{selected.name}</p>
              <p className="text-xs text-teal-600">{selected.description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Name */}
      <div>
        <label className="label" htmlFor="name">Your Full Name</label>
        <input
          id="name"
          type="text"
          className="input"
          placeholder="Jane Smith"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="label" htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          className="input"
          placeholder="jane@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <p className="text-xs text-slate-500 mt-1">
          You'll use this email to log into your buyer dashboard.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-3 text-base"
      >
        {loading ? 'Reserving…' : `Reserve ${selected?.name ?? 'Axolotl'}`}
      </button>

      <p className="text-xs text-slate-400 text-center">
        By reserving, you agree to our care guidelines and pickup/shipping terms.
      </p>
    </form>
  )
}
