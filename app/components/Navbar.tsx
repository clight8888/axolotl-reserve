'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AxolotlIcon from './AxolotlIcon'

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Inventory' },
    { href: '/reserve', label: 'Reserve' },
    { href: '/dashboard', label: 'My Dashboard' },
    { href: '/admin', label: 'Admin' },
  ]

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <AxolotlIcon size={32} />
            <span className="font-bold text-teal-700 text-lg tracking-tight">
              Axolotl Reserve
            </span>
          </Link>
          <div className="flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
