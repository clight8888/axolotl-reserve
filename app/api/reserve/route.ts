import { NextRequest, NextResponse } from 'next/server'
import { readAxolotls, writeAxolotls } from '@/lib/data'

export async function POST(request: NextRequest) {
  try {
    const { name, email, axolotlId } = await request.json()

    if (!name || !email || !axolotlId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const axolotls = readAxolotls()
    const idx = axolotls.findIndex(a => a.id === axolotlId)

    if (idx === -1) {
      return NextResponse.json({ error: 'Axolotl not found' }, { status: 404 })
    }

    if (axolotls[idx].status === 'Reserved') {
      return NextResponse.json({ error: 'This axolotl is already reserved' }, { status: 409 })
    }

    axolotls[idx] = {
      ...axolotls[idx],
      status: 'Reserved',
      buyerName: name,
      buyerEmail: email,
      reservedDate: new Date().toISOString().slice(0, 10),
    }

    writeAxolotls(axolotls)

    return NextResponse.json({ success: true, axolotl: axolotls[idx] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reserve axolotl' }, { status: 500 })
  }
}
