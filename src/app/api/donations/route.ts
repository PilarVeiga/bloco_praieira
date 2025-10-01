import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const donations = await prisma.donation.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50 // Limit to last 50 donations
    })

    const totalAmount = await prisma.donation.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { amount: true }
    })

    return NextResponse.json({
      donations,
      totalAmount: totalAmount._sum.amount || 0
    })
  } catch (error) {
    console.error('Error fetching donations:', error)
    return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, donorName, donorEmail, pixKey } = body

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Valid amount is required' },
        { status: 400 }
      )
    }

    const donation = await prisma.donation.create({
      data: {
        amount: parseFloat(amount),
        donorName: donorName || null,
        donorEmail: donorEmail || null,
        pixKey: pixKey || process.env.PIX_KEY || 'blocopraieira@gmail.com'
      }
    })

    return NextResponse.json(donation, { status: 201 })
  } catch (error) {
    console.error('Error creating donation:', error)
    return NextResponse.json({ error: 'Failed to create donation' }, { status: 500 })
  }
}