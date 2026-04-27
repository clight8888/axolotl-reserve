import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { readAxolotls } from '@/lib/data'
import AdminPanel from './AdminPanel'
import AdminLogin from './AdminLogin'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  const user = session?.user as any

  if (!session || user?.role !== 'admin') {
    return <AdminLogin />
  }

  const axolotls = readAxolotls()

  return <AdminPanel axolotls={axolotls} />
}
