import Link from 'next/link'
import { Axolotl } from '@/types'
import AxolotlImage from './AxolotlImage'

interface Props {
  axolotl: Axolotl
}

export default function AxolotlCard({ axolotl }: Props) {
  const isAvailable = axolotl.status === 'Available'

  return (
    <div className="card flex flex-col hover:shadow-md transition-shadow duration-200">
      {/* Photo */}
      <div
        className="h-48 relative overflow-hidden"
        style={{ backgroundColor: `#${axolotl.imageColor}20`, borderBottom: `4px solid #${axolotl.imageColor}` }}
      >
        <AxolotlImage axolotl={axolotl} />
        <div className="absolute top-3 right-3">
          {isAvailable ? (
            <span className="badge-available">● Available</span>
          ) : (
            <span className="badge-reserved">● Reserved</span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-bold text-slate-800 text-lg">{axolotl.name}</h3>
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {axolotl.morph}
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-2">
          {axolotl.age} · {axolotl.weight} · {axolotl.length}
        </p>
        <p className="text-sm text-slate-600 flex-1 line-clamp-3">{axolotl.description}</p>

        {isAvailable ? (
          <div className="mt-4">
            <Link
              href={`/reserve?axolotlId=${axolotl.id}`}
              className="btn-primary w-full text-center"
            >
              Reserve {axolotl.name}
            </Link>
          </div>
        ) : (
          <div className="mt-4">
            <div className="w-full text-center py-2 text-sm text-slate-400 bg-slate-50 rounded-lg border border-slate-200">
              Reserved by {axolotl.buyerName?.split(' ')[0]}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
