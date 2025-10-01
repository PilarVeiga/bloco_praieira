import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      where: { isActive: true },
      orderBy: [
        { instrument: 'asc' },
        { name: 'asc' }
      ]
    })

    // Group members by instrument
    const groupedMembers = members.reduce((acc, member) => {
      const instrument = member.instrument
      if (!acc[instrument]) {
        acc[instrument] = []
      }
      acc[instrument].push(member)
      return acc
    }, {} as Record<string, typeof members>)

    return NextResponse.json(groupedMembers)
  } catch (error) {
    console.error('Error fetching members:', error)
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, role, instrument } = body

    if (!name || !instrument) {
      return NextResponse.json(
        { error: 'Name and instrument are required' },
        { status: 400 }
      )
    }

    const member = await prisma.member.create({
      data: {
        name,
        role: role || null,
        instrument
      }
    })

    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    console.error('Error creating member:', error)
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 })
  }
}