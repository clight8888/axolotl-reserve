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
        <div className="flex flex-col gap-2 py-3 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-0">
          <Link href="/" className="flex items-center justify-center gap-2 sm:justify-start">
            <AxolotlIcon size={32} />
            <span className="font-bold text-teal-700 text-base tracking-tight sm:text-lg">
              Axolotl Reserve
            </span>
          </Link>
          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center sm:gap-1">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-2 py-2 text-center text-xs font-medium transition-colors sm:px-3 sm:py-1.5 sm:text-sm ${
                  pathname === link.href
                    ? 'bg-teal-100 text-teal-700'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 sm:bg-transparent'
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
