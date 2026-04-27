import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { readAxolotls, writeAxolotls } from '@/lib/data'
import { Axolotl, VideoNote } from '@/types'

export const dynamic = 'force-dynamic'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  const user = session?.user as any
  return user?.role === 'admin'
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json(readAxolotls())
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const axolotls = readAxolotls()

    if (body.action === 'add') {
      const newAxolotl: Axolotl = {
        id: `axl-${Date.now()}`,
        name: body.name,
        morph: body.morph,
        status: 'Available',
        age: body.age,
        weight: body.weight,
        length: body.length,
        description: body.description,
        imageColor: ['f9a8d4', 'fbbf24', '6b7280', '1e293b', '94a3b8', 'f97316'][
          Math.floor(Math.random() * 6)
        ],
        videoNotes: [],
        growthTimeline: [],
      }
      axolotls.push(newAxolotl)
      writeAxolotls(axolotls)
      return NextResponse.json({ success: true, axolotls })
    }

    if (body.action === 'updateStatus') {
      const idx = axolotls.findIndex(a => a.id === body.id)
      if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      axolotls[idx] = {
        ...axolotls[idx],
        status: body.status,
        ...(body.status === 'Available'
          ? { buyerName: undefined, buyerEmail: undefined, reservedDate: undefined }
          : {}),
      }
      writeAxolotls(axolotls)
      return NextResponse.json({ success: true, axolotls })
    }

    if (body.action === 'addVideoNote') {
      const idx = axolotls.findIndex(a => a.id === body.axolotlId)
      if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      const note: VideoNote = {
        id: `vn-${Date.now()}`,
        title: body.title,
        url: body.url,
        date: body.date,
        description: body.description,
      }
      axolotls[idx].videoNotes.push(note)
      writeAxolotls(axolotls)
      return NextResponse.json({ success: true, axolotls })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
