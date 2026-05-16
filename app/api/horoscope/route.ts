import { NextRequest, NextResponse } from 'next/server'

const signs = [
  { name: 'Bélier', start: { month: 3, day: 21 }, end: { month: 4, day: 19 }, element: 'Feu', planet: 'Mars' },
  { name: 'Taureau', start: { month: 4, day: 20 }, end: { month: 5, day: 20 }, element: 'Terre', planet: 'Vénus' },
  { name: 'Gémeaux', start: { month: 5, day: 21 }, end: { month: 6, day: 20 }, element: 'Air', planet: 'Mercure' },
  { name: 'Cancer', start: { month: 6, day: 21 }, end: { month: 7, day: 22 }, element: 'Eau', planet: 'Lune' },
  { name: 'Lion', start: { month: 7, day: 23 }, end: { month: 8, day: 22 }, element: 'Feu', planet: 'Soleil' },
  { name: 'Vierge', start: { month: 8, day: 23 }, end: { month: 9, day: 22 }, element: 'Terre', planet: 'Mercure' },
  { name: 'Balance', start: { month: 9, day: 23 }, end: { month: 10, day: 22 }, element: 'Air', planet: 'Vénus' },
  { name: 'Scorpion', start: { month: 10, day: 23 }, end: { month: 11, day: 21 }, element: 'Eau', planet: 'Pluton' },
  { name: 'Sagittaire', start: { month: 11, day: 22 }, end: { month: 12, day: 21 }, element: 'Feu', planet: 'Jupiter' },
  { name: 'Capricorne', start: { month: 12, day: 22 }, end: { month: 1, day: 19 }, element: 'Terre', planet: 'Saturne' },
  { name: 'Verseau', start: { month: 1, day: 20 }, end: { month: 2, day: 18 }, element: 'Air', planet: 'Uranus' },
  { name: 'Poissons', start: { month: 2, day: 19 }, end: { month: 3, day: 20 }, element: 'Eau', planet: 'Neptune' },
]

function getSign(day: number, month: number) {
  for (const sign of signs) {
    const start = sign.start
    const end = sign.end
    if (start.month === 12 && end.month === 1) {
      if ((month === 12 && day >= start.day) || (month === 1 && day <= end.day)) {
        return sign
      }
    } else {
      if ((month === start.month && day >= start.day) || (month === end.month && day <= end.day)) {
        return sign
      }
    }
  }
  return signs[0]
}

function getMoonSign(day: number, month: number): string {
  const offset = (day + month * 7) % 12
  return signs[offset].name
}

function getAscendant(hour: number): string {
  const ascendantIndex = Math.floor(hour / 2) % 12
  return signs[ascendantIndex].name
}

const compatibilities: Record<string, string[]> = {
  'Bélier': ['Lion', 'Sagittaire', 'Gémeaux', 'Verseau'],
  'Taureau': ['Vierge', 'Capricorne', 'Cancer', 'Poissons'],
  'Gémeaux': ['Balance', 'Verseau', 'Bélier', 'Lion'],
  'Cancer': ['Scorpion', 'Poissons', 'Taureau', 'Vierge'],
  'Lion': ['Bélier', 'Sagittaire', 'Gémeaux', 'Balance'],
  'Vierge': ['Taureau', 'Capricorne', 'Cancer', 'Scorpion'],
  'Balance': ['Gémeaux', 'Verseau', 'Lion', 'Sagittaire'],
  'Scorpion': ['Cancer', 'Poissons', 'Vierge', 'Capricorne'],
  'Sagittaire': ['Bélier', 'Lion', 'Balance', 'Verseau'],
  'Capricorne': ['Taureau', 'Vierge', 'Scorpion', 'Poissons'],
  'Verseau': ['Gémeaux', 'Balance', 'Bélier', 'Sagittaire'],
  'Poissons': ['Cancer', 'Scorpion', 'Taureau', 'Capricorne'],
}

function getCompatibility(sign1: string, sign2: string): { score: number; text: string } {
  if (sign1 === sign2) {
    return { score: 70, text: "Une relation intense mais parfois trop similaire. L'harmonie est possible avec des efforts mutuels." }
  }
  const isCompatible = compatibilities[sign1]?.includes(sign2)
  if (isCompatible) {
    const score = 75 + Math.floor(Math.random() * 20)
    return { score, text: 'Excellente compatibilité ! Les astres sont alignés pour une relation harmonieuse et enrichissante.' }
  } else {
    const score = 30 + Math.floor(Math.random() * 30)
    return { score, text: 'La compatibilité est moyenne. Des défis sont présents, mais la compréhension mutuelle peut tout changer.' }
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')
  const day = parseInt(searchParams.get('day') || '1')
  const month = parseInt(searchParams.get('month') || '1')
  const hour = parseInt(searchParams.get('hour') || '12')
  const sign2 = searchParams.get('sign2') || ''

  if (action === 'compatibility') {
    const sign1 = getSign(day, month).name
    const compat = getCompatibility(sign1, sign2)
    return NextResponse.json({ sign1, sign2, compatibility: compat.score, description: compat.text })
  }

  const sunSign = getSign(day, month)
  const moonSign = getMoonSign(day, month)
  const ascendant = getAscendant(hour)

  return NextResponse.json({
    sun: { sign: sunSign.name, element: sunSign.element, planet: sunSign.planet, description: `Le Soleil en ${sunSign.name} vous confère une nature ${sunSign.element.toLowerCase()} typique, gouvernée par ${sunSign.planet}.` },
    moon: { sign: moonSign, description: `Votre Lune en ${moonSign} révèle votre monde émotionnel intérieur.` },
    ascendant: { sign: ascendant, description: `Votre Ascendant ${ascendant} influence la première impression que vous donnez.` }
  })
}