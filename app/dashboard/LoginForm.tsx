'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn('buyer', {
      email,
      redirect: false,
      callbackUrl: '/dashboard',
    })

    setLoading(false)

    if (result?.error) {
      setError('No reservation found for that email. Did you reserve an axolotl?')
    } else {
      router.refresh()
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🦎</div>
        <h1 className="text-3xl font-bold text-slate-800">Buyer Dashboard</h1>
        <p className="text-slate-500 mt-2">
          Enter the email you used when reserving your axolotl.
        </p>
      </div>

      <div className="card p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="email">Reservation Email</label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-2.5"
          >
            {loading ? 'Checking…' : 'Access My Dashboard'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <p className="text-xs text-slate-400 text-center mb-3">Demo: try one of these reserved buyer emails</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['sarah@example.com', 'mike@example.com', 'emma@example.com'].map(e => (
              <button
                key={e}
                type="button"
                onClick={() => setEmail(e)}
                className="text-xs px-2 py-1 bg-teal-50 text-teal-700 rounded border border-teal-200 hover:bg-teal-100 transition"
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
