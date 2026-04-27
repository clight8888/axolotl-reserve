import { NextResponse } from 'next/server'
import { readAxolotls } from '@/lib/data'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const axolotls = readAxolotls()
    return NextResponse.json(axolotls)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read axolotls' }, { status: 500 })
  }
}
