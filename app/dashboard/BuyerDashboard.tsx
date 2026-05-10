'use client'

import { signOut } from 'next-auth/react'
import { Axolotl } from '@/types'
import AxolotlIcon from '@/app/components/AxolotlIcon'

interface Props {
  axolotl: Axolotl
  buyerName: string
}

export default function BuyerDashboard({ axolotl, buyerName }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-teal-600 font-medium text-sm mb-1">Welcome back,</p>
          <h1 className="text-3xl font-bold text-slate-800">{buyerName} 👋</h1>
          <p className="text-slate-500 mt-1">Here's how {axolotl.name} is doing!</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/dashboard' })}
          className="btn-secondary text-xs"
        >
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Axolotl card */}
        <div className="lg:col-span-1">
          <div className="card overflow-hidden">
            <div
              className="h-48 flex items-center justify-center"
              style={{ backgroundColor: `#${axolotl.imageColor}20`, borderBottom: `4px solid #${axolotl.imageColor}` }}
            >
              <div className="text-center flex flex-col items-center">
                <AxolotlIcon size={72} />
                <p className="text-sm font-semibold mt-2" style={{ color: `#${axolotl.imageColor}` }}>
                  {axolotl.name}
                </p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-slate-800">{axolotl.name}</h2>
                <span className="badge-reserved">Reserved</span>
              </div>
              <div className="space-y-1 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Morph</span>
                  <span className="font-medium">{axolotl.morph}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Age</span>
                  <span className="font-medium">{axolotl.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Weight</span>
                  <span className="font-medium">{axolotl.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Length</span>
                  <span className="font-medium">{axolotl.length}</span>
                </div>
                {axolotl.reservedDate && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Reserved</span>
                    <span className="font-medium">
                      {new Date(axolotl.reservedDate).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-3">{axolotl.description}</p>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live feed placeholder */}
          <div className="card p-5">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <span>📹</span> Live Feed &amp; Video Updates
            </h3>
            {axolotl.videoNotes.length === 0 ? (
              <div className="bg-slate-50 rounded-xl border border-slate-200 h-32 flex items-center justify-center text-sm text-slate-400">
                No video updates yet — check back soon!
              </div>
            ) : (
              <div className="space-y-3">
                {axolotl.videoNotes.map(note => (
                  <div key={note.id} className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-teal-200 transition">
                    <div className="w-24 h-16 bg-slate-200 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      ▶️
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-slate-800">{note.title}</p>
                      <p className="text-xs text-slate-500 mb-1">
                        {new Date(note.date).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric'
                        })}
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-2">{note.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Growth timeline */}
          <div className="card p-5">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span>📈</span> Growth Timeline
            </h3>
            {axolotl.growthTimeline.length === 0 ? (
              <p className="text-sm text-slate-400">No growth data yet.</p>
            ) : (
              <div className="relative">
                {/* Horizontal line */}
                <div className="absolute top-5 left-4 right-4 h-0.5 bg-teal-100" />
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {axolotl.growthTimeline.map((entry, idx) => (
                    <div key={idx} className="flex flex-col items-center min-w-[100px]">
                      <div className="w-10 h-10 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center z-10 shadow">
                        {entry.weight}
                      </div>
                      <div className="mt-2 text-center">
                        <p className="text-xs font-semibold text-slate-700">{entry.length}</p>
                        <p className="text-xs text-slate-400">
                          {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-xs text-slate-500 mt-1 max-w-[90px] leading-tight">{entry.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Care notes */}
          <div className="card p-5">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <span>💡</span> Care Reminders
            </h3>
            <ul className="text-sm text-slate-600 space-y-2">
              {[
                'Keep water temperature between 60–68°F (16–20°C)',
                'Use a de-chlorinator before adding tap water',
                'Feed earthworms, bloodworms, or axolotl pellets daily',
                'Avoid placing the tank in direct sunlight',
                'Perform 20% water changes weekly',
              ].map(tip => (
                <li key={tip} className="flex gap-2">
                  <span className="text-teal-500 flex-shrink-0">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
