import Link from 'next/link'

interface Props {
  searchParams: { name?: string }
}

export default function SuccessPage({ searchParams }: Props) {
  const name = searchParams.name ?? 'your axolotl'

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-3xl font-bold text-slate-800 mb-3">
        {name} is yours!
      </h1>
      <p className="text-slate-500 text-lg mb-8">
        Your reservation is confirmed. Use your email to log into your buyer dashboard
        and start following {name}'s growth journey.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/dashboard" className="btn-primary px-8 py-3">
          Go to My Dashboard
        </Link>
        <Link href="/" className="btn-secondary px-8 py-3">
          Back to Inventory
        </Link>
      </div>
    </div>
  )
}
