import fs from 'fs'
import path from 'path'
import { Axolotl } from '@/types'

const DATA_FILE = path.join(process.cwd(), 'data', 'axolotls.json')

export function readAxolotls(): Axolotl[] {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8')
  return JSON.parse(raw) as Axolotl[]
}

export function writeAxolotls(axolotls: Axolotl[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(axolotls, null, 2), 'utf-8')
}

export function getAxolotlById(id: string): Axolotl | undefined {
  return readAxolotls().find(a => a.id === id)
}

export function getAxolotlByBuyerEmail(email: string): Axolotl | undefined {
  return readAxolotls().find(
    a => a.status === 'Reserved' && a.buyerEmail?.toLowerCase() === email.toLowerCase()
  )
}
