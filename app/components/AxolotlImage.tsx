import { Axolotl } from '@/types'
import AxolotlIcon from './AxolotlIcon'

interface Props {
  axolotl: Axolotl
  className?: string
  iconSize?: number
  showUnavailableText?: boolean
}

export default function AxolotlImage({
  axolotl,
  className = 'h-full w-full object-cover',
  iconSize = 72,
  showUnavailableText = true,
}: Props) {
  if (axolotl.imageUrl) {
    return (
      <img
        src={axolotl.imageUrl}
        alt={`${axolotl.name} the axolotl`}
        className={className}
      />
    )
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
      <AxolotlIcon size={iconSize} />
      {showUnavailableText && (
        <p className="text-xs font-medium text-slate-400">Image unavailable</p>
      )}
    </div>
  )
}
