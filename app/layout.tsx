import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'

// Using system font stack to avoid network dependency on first load
const inter = { className: 'font-sans' }

export const metadata: Metadata = {
  title: 'Axolotl Reserve',
  description: 'Reserve your very own axolotl and follow their growth journey',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-slate-800 text-slate-400 text-center text-sm py-6 mt-16">
          <p>🦎 Axolotl Reserve — Ethically raised, lovingly cared for</p>
          <p className="mt-1 text-slate-500 text-xs">Demo app · Not a real axolotl store</p>
        </footer>
      </body>
    </html>
  )
}
