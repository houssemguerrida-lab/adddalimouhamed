import { NextRequest, NextResponse } from 'next/server'

declare global {
  var bookings: Booking[]
}

if (!globalThis.bookings) {
  globalThis.bookings = []
}

interface Booking {
  id: string
  name: string
  email: string
  message: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'rejected'
  createdAt: string
  whatsappLink: string
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const password = searchParams.get('password')
  if (password !== 'admin2024Adddali') {
    return NextResponse.json({ error: 'Accès non autorisé' }, { status: 401 })
  }
  return NextResponse.json(globalThis.bookings)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message, date, time } = body
    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2)
    const whatsappLink = `https://wa.me/33669395667?text=Bonjour%20AdddaliMouhamed%2C%20je%20suis%20${encodeURIComponent(name)}%20et%20ma%20consultation%20du%20${encodeURIComponent(date)}%20%C3%A0%20${encodeURIComponent(time)}%20est%20confirm%C3%A9e.%20Mon%20email%20%3A%20${encodeURIComponent(email)}.%20Je%20suis%20pr%C3%AAt(e)%20pour%20la%20visio.`
    const booking: Booking = { id, name, email, message: message || '', date, time, status: 'pending', createdAt: new Date().toISOString(), whatsappLink }
    globalThis.bookings.push(booking)
    return NextResponse.json({ success: true, booking })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, password } = body
    if (password !== 'admin2024Adddali') {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 401 })
    }
    if (!id || !status) {
      return NextResponse.json({ error: 'ID et statut requis' }, { status: 400 })
    }
    const booking = globalThis.bookings.find((b: Booking) => b.id === id)
    if (!booking) {
      return NextResponse.json({ error: 'Réservation non trouvée' }, { status: 404 })
    }
    booking.status = status
    return NextResponse.json({ success: true, booking })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}