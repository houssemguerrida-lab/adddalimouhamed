import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  if (!email) {
    return NextResponse.json({ error: 'Email requis' }, { status: 400 })
  }
  const booking = globalThis.bookings?.find((b: any) => b.email === email)
  if (!booking) {
    return NextResponse.json({ found: false })
  }
  return NextResponse.json({ found: true, booking })
}