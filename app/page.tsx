import { readAxolotls } from '@/lib/data'
import AxolotlCard from './components/AxolotlCard'
import AxolotlIcon from './components/AxolotlIcon'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const axolotls = readAxolotls()
  const available = axolotls.filter(a => a.status === 'Available').length
  const reserved = axolotls.filter(a => a.status === 'Reserved').length

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="flex justify-center mb-4">
            <AxolotlIcon size={80} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Welcome to Axolotl Reserve
          </h1>
          <p className="text-teal-100 text-lg max-w-2xl mx-auto mb-8">
            Reserve your own ethically raised axolotl, track their growth journey, and receive
            personal video updates as they grow up.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <div className="bg-white/10 rounded-xl px-6 py-3">
              <div className="text-3xl font-bold">{available}</div>
              <div className="text-teal-200">Available</div>
            </div>
            <div className="bg-white/10 rounded-xl px-6 py-3">
              <div className="text-3xl font-bold">{reserved}</div>
              <div className="text-teal-200">Reserved</div>
            </div>
            <div className="bg-white/10 rounded-xl px-6 py-3">
              <div className="text-3xl font-bold">{axolotls.length}</div>
              <div className="text-teal-200">Total</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { icon: '🔍', title: 'Choose Your Axolotl', desc: 'Browse our available morphs and pick the one that speaks to you.' },
              { icon: '📋', title: 'Reserve Online', desc: 'Fill out a quick form with your name and email to secure your spot.' },
              { icon: '📹', title: 'Watch Them Grow', desc: 'Access your dashboard for video updates and growth milestones.' },
            ].map(step => (
              <div key={step.title} className="flex flex-col items-center gap-3">
                <div className="text-4xl">{step.icon}</div>
                <h3 className="font-semibold text-slate-800">{step.title}</h3>
                <p className="text-sm text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inventory grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Our Axolotls</h2>
            <p className="text-slate-500 text-sm mt-1">
              {available} available for reservation · {reserved} already spoken for
            </p>
          </div>
        </div>

        {/* Available section */}
        {axolotls.filter(a => a.status === 'Available').length > 0 && (
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Available Now
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {axolotls
                .filter(a => a.status === 'Available')
                .map(axolotl => (
                  <AxolotlCard key={axolotl.id} axolotl={axolotl} />
                ))}
            </div>
          </div>
        )}

        {/* Reserved section */}
        {axolotls.filter(a => a.status === 'Reserved').length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              Already Reserved
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 opacity-80">
              {axolotls
                .filter(a => a.status === 'Reserved')
                .map(axolotl => (
                  <AxolotlCard key={axolotl.id} axolotl={axolotl} />
                ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
