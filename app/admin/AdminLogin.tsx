'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn('admin', {
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('Incorrect password.')
    } else {
      router.refresh()
    }
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-20">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🔐</div>
        <h1 className="text-3xl font-bold text-slate-800">Admin Panel</h1>
        <p className="text-slate-500 mt-2">Enter the admin password to continue.</p>
      </div>

      <div className="card p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="password">Admin Password</label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="••••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">
            {loading ? 'Checking…' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700 text-center">
          Demo password: <code className="font-mono font-bold">axolotl-admin</code>
        </div>
      </div>
    </div>
  )
}
