import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAxolotlById } from '@/lib/data'
import LoginForm from './LoginForm'
import BuyerDashboard from './BuyerDashboard'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const user = session?.user as any

  if (!session) {
    return <LoginForm />
  }

  if (user?.role === 'admin') {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🔐</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">You're logged in as Admin</h2>
        <p className="text-slate-500 mb-6">Head to the admin panel to manage axolotl records.</p>
        <a href="/admin" className="btn-primary px-8 py-3">Go to Admin Panel</a>
      </div>
    )
  }

  const axolotl = user?.axolotlId ? getAxolotlById(user.axolotlId) : null

  if (!axolotl) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">No axolotl found</h2>
        <p className="text-slate-500">
          We couldn't find a reserved axolotl for this account. Please check your email or
          reserve one first.
        </p>
      </div>
    )
  }

  return <BuyerDashboard axolotl={axolotl} buyerName={user?.name ?? 'Friend'} />
}
