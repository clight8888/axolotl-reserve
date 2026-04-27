import { readAxolotls } from '@/lib/data'
import ReserveForm from './ReserveForm'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: { axolotlId?: string }
}

export default function ReservePage({ searchParams }: Props) {
  const axolotls = readAxolotls()
  const available = axolotls.filter(a => a.status === 'Available')
  const preselected = searchParams.axolotlId ?? ''

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8 text-center">
        <div className="text-4xl mb-3">📋</div>
        <h1 className="text-3xl font-bold text-slate-800">Reserve Your Axolotl</h1>
        <p className="text-slate-500 mt-2">
          Fill out the form below to secure your axolotl. You'll receive dashboard access to
          watch them grow.
        </p>
      </div>

      {available.length === 0 ? (
        <div className="card p-10 text-center">
          <div className="text-5xl mb-4">😔</div>
          <h2 className="text-xl font-semibold text-slate-700 mb-2">All Axolotls Are Reserved</h2>
          <p className="text-slate-500">
            Check back soon — new batches hatch regularly!
          </p>
        </div>
      ) : (
        <div className="card p-6 sm:p-8">
          <ReserveForm axolotls={available} preselectedId={preselected} />
        </div>
      )}
    </div>
  )
}
