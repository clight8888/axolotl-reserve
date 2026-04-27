'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Axolotl } from '@/types'

interface Props {
  axolotls: Axolotl[]
}

export default function AdminPanel({ axolotls: initialAxolotls }: Props) {
  const router = useRouter()
  const [axolotls, setAxolotls] = useState(initialAxolotls)
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'video'>('list')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Add axolotl form
  const [newAxolotl, setNewAxolotl] = useState({
    name: '', morph: '', age: '', weight: '', length: '', description: '',
  })

  // Video note form
  const [videoNote, setVideoNote] = useState({
    axolotlId: axolotls[0]?.id ?? '',
    title: '', url: '', date: new Date().toISOString().slice(0, 10), description: '',
  })

  async function handleAddAxolotl(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'add', ...newAxolotl }),
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) {
      setMessage('Axolotl added successfully!')
      setAxolotls(data.axolotls)
      setNewAxolotl({ name: '', morph: '', age: '', weight: '', length: '', description: '' })
    } else {
      setMessage(data.error ?? 'Error adding axolotl.')
    }
  }

  async function handleUpdateStatus(id: string, status: 'Available' | 'Reserved') {
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'updateStatus', id, status }),
    })
    const data = await res.json()
    if (res.ok) setAxolotls(data.axolotls)
  }

  async function handleAddVideoNote(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'addVideoNote', ...videoNote }),
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) {
      setMessage('Video note added!')
      setAxolotls(data.axolotls)
      setVideoNote(v => ({ ...v, title: '', url: '', description: '' }))
    } else {
      setMessage(data.error ?? 'Error adding video note.')
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Admin Panel</h1>
          <p className="text-slate-500 mt-1">Manage axolotl records and media</p>
        </div>
        <button onClick={() => signOut({ callbackUrl: '/admin' })} className="btn-secondary text-sm">
          Sign Out
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total', value: axolotls.length, color: 'slate' },
          { label: 'Available', value: axolotls.filter(a => a.status === 'Available').length, color: 'emerald' },
          { label: 'Reserved', value: axolotls.filter(a => a.status === 'Reserved').length, color: 'amber' },
        ].map(stat => (
          <div key={stat.label} className="card p-4 text-center">
            <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
            <div className="text-sm text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'list', label: '📋 Axolotl List' },
          { id: 'add', label: '➕ Add New' },
          { id: 'video', label: '🎬 Add Video Note' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id as any); setMessage('') }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-teal-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {message && (
        <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-700">
          {message}
        </div>
      )}

      {/* Axolotl list */}
      {activeTab === 'list' && (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Morph</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Stats</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Buyer</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {axolotls.map(a => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{a.name}</td>
                  <td className="px-4 py-3 text-slate-500">{a.morph}</td>
                  <td className="px-4 py-3 text-slate-500">{a.weight} · {a.length}</td>
                  <td className="px-4 py-3">
                    {a.status === 'Available' ? (
                      <span className="badge-available">Available</span>
                    ) : (
                      <span className="badge-reserved">Reserved</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {a.buyerName ? `${a.buyerName}` : '—'}
                  </td>
                  <td className="px-4 py-3">
                    {a.status === 'Reserved' ? (
                      <button
                        onClick={() => handleUpdateStatus(a.id, 'Available')}
                        className="text-xs text-amber-600 hover:underline"
                      >
                        Mark Available
                      </button>
                    ) : (
                      <span className="text-xs text-slate-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add axolotl */}
      {activeTab === 'add' && (
        <div className="card p-6">
          <h2 className="font-bold text-slate-800 mb-4">Add New Axolotl</h2>
          <form onSubmit={handleAddAxolotl} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Name</label>
              <input className="input" value={newAxolotl.name}
                onChange={e => setNewAxolotl(p => ({ ...p, name: e.target.value }))}
                placeholder="Sparkle" required />
            </div>
            <div>
              <label className="label">Morph</label>
              <select className="input" value={newAxolotl.morph}
                onChange={e => setNewAxolotl(p => ({ ...p, morph: e.target.value }))} required>
                <option value="">Select…</option>
                {['Leucistic', 'Wild Type', 'Golden Albino', 'Melanoid', 'Axanthic', 'Copper', 'Leucistic Pink'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Age</label>
              <input className="input" value={newAxolotl.age}
                onChange={e => setNewAxolotl(p => ({ ...p, age: e.target.value }))}
                placeholder="3 months" required />
            </div>
            <div>
              <label className="label">Weight</label>
              <input className="input" value={newAxolotl.weight}
                onChange={e => setNewAxolotl(p => ({ ...p, weight: e.target.value }))}
                placeholder="45g" required />
            </div>
            <div>
              <label className="label">Length</label>
              <input className="input" value={newAxolotl.length}
                onChange={e => setNewAxolotl(p => ({ ...p, length: e.target.value }))}
                placeholder="17cm" required />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Description</label>
              <textarea className="input" rows={3} value={newAxolotl.description}
                onChange={e => setNewAxolotl(p => ({ ...p, description: e.target.value }))}
                placeholder="Describe this axolotl's appearance and personality…" required />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" disabled={loading} className="btn-primary px-8">
                {loading ? 'Adding…' : 'Add Axolotl'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add video note */}
      {activeTab === 'video' && (
        <div className="card p-6">
          <h2 className="font-bold text-slate-800 mb-4">Add Video Update Note</h2>
          <form onSubmit={handleAddVideoNote} className="space-y-4">
            <div>
              <label className="label">Axolotl</label>
              <select className="input" value={videoNote.axolotlId}
                onChange={e => setVideoNote(p => ({ ...p, axolotlId: e.target.value }))} required>
                {axolotls.filter(a => a.status === 'Reserved').map(a => (
                  <option key={a.id} value={a.id}>{a.name} ({a.buyerName})</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Video Title</label>
                <input className="input" value={videoNote.title}
                  onChange={e => setVideoNote(p => ({ ...p, title: e.target.value }))}
                  placeholder="Week 3 Update" required />
              </div>
              <div>
                <label className="label">Date</label>
                <input type="date" className="input" value={videoNote.date}
                  onChange={e => setVideoNote(p => ({ ...p, date: e.target.value }))} required />
              </div>
            </div>
            <div>
              <label className="label">Video URL</label>
              <input className="input" value={videoNote.url}
                onChange={e => setVideoNote(p => ({ ...p, url: e.target.value }))}
                placeholder="https://youtube.com/watch?v=..." required />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea className="input" rows={2} value={videoNote.description}
                onChange={e => setVideoNote(p => ({ ...p, description: e.target.value }))}
                placeholder="A short description of what's in the video…" required />
            </div>
            <button type="submit" disabled={loading} className="btn-primary px-8">
              {loading ? 'Saving…' : 'Add Video Note'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
