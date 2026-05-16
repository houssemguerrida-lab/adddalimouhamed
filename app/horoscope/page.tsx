'use client'

import { useState } from 'react'

interface SignResult {
  sun: { sign: string; element: string; planet: string; description: string }
  moon: { sign: string; description: string }
  ascendant: { sign: string; description: string }
}

export default function HoroscopePage() {
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [hour, setHour] = useState('12')
  const [result, setResult] = useState<SignResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [compatDay, setCompatDay] = useState('')
  const [compatMonth, setCompatMonth] = useState('')
  const [compatSign2, setCompatSign2] = useState('Bélier')
  const [compatResult, setCompatResult] = useState<{ sign1: string; sign2: string; compatibility: number; description: string } | null>(null)
  const [compatLoading, setCompatLoading] = useState(false)
  const signs = ['Bélier', 'Taureau', 'Gémeaux', 'Cancer', 'Lion', 'Vierge', 'Balance', 'Scorpion', 'Sagittaire', 'Capricorne', 'Verseau', 'Poissons']

  const calculateSign = async () => {
    if (!day || !month) return
    setLoading(true)
    try {
      const res = await fetch("/api/horoscope?day=" + day + "&month=" + month + "&hour=" + hour)
      const data = await res.json()
      setResult(data)
    } catch (error) { console.error(error) }
    setLoading(false)
  }

  const calculateCompatibility = async () => {
    if (!compatDay || !compatMonth || !compatSign2) return
    setCompatLoading(true)
    try {
      const res = await fetch("/api/horoscope?action=compatibility&day=" + compatDay + "&month=" + compatMonth + "&sign2=" + compatSign2)
      const data = await res.json()
      setCompatResult(data)
    } catch (error) { console.error(error) }
    setCompatLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif text-center text-zen-900 mb-4">Votre Thème Astral</h1>
      <p className="text-center text-zen-600 mb-12">Découvrez gratuitement votre signe solaire, lunaire et ascendant</p>
      <div className="card mb-12">
        <h2 className="text-2xl font-serif text-zen-800 mb-6">Calculer mon signe</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-zen-700 mb-2">Jour de naissance</label>
            <input type="number" min="1" max="31" value={day} onChange={(e) => setDay(e.target.value)} className="input-field" placeholder="JJ" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zen-700 mb-2">Mois de naissance</label>
            <input type="number" min="1" max="12" value={month} onChange={(e) => setMonth(e.target.value)} className="input-field" placeholder="MM" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zen-700 mb-2">Heure de naissance</label>
            <select value={hour} onChange={(e) => setHour(e.target.value)} className="input-field">
              {Array.from({ length: 24 }, (_, i) => (<option key={i} value={i}>{i}h</option>))}
            </select>
          </div>
        </div>
        <button onClick={calculateSign} disabled={loading} className="btn-primary w-full md:w-auto">
          {loading ? 'Calcul en cours...' : 'Révéler mon thème'}
        </button>
        {result && (
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-zen-50 rounded-xl p-5 text-center">
              <p className="text-sm text-zen-500 uppercase mb-1">Signe solaire</p>
              <p className="text-2xl font-serif text-zen-800 mb-2">{result.sun.sign}</p>
              <p className="text-xs text-zen-600">{result.sun.element} - {result.sun.planet}</p>
              <p className="text-sm text-zen-700 mt-3">{result.sun.description}</p>
            </div>
            <div className="bg-beige-50 rounded-xl p-5 text-center">
              <p className="text-sm text-beige-500 uppercase mb-1">Signe lunaire</p>
              <p className="text-2xl font-serif text-zen-800 mb-2">{result.moon.sign}</p>
              <p className="text-sm text-zen-700 mt-3">{result.moon.description}</p>
            </div>
            <div className="bg-zen-50 rounded-xl p-5 text-center">
              <p className="text-sm text-zen-500 uppercase mb-1">Ascendant</p>
              <p className="text-2xl font-serif text-zen-800 mb-2">{result.ascendant.sign}</p>
              <p className="text-sm text-zen-700 mt-3">{result.ascendant.description}</p>
            </div>
          </div>
        )}
      </div>
      <div className="card">
        <h2 className="text-2xl font-serif text-zen-800 mb-6">Compatibilité amoureuse</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-zen-700 mb-2">Votre jour</label>
            <input type="number" min="1" max="31" value={compatDay} onChange={(e) => setCompatDay(e.target.value)} className="input-field" placeholder="JJ" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zen-700 mb-2">Votre mois</label>
            <input type="number" min="1" max="12" value={compatMonth} onChange={(e) => setCompatMonth(e.target.value)} className="input-field" placeholder="MM" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zen-700 mb-2">Son signe</label>
            <select value={compatSign2} onChange={(e) => setCompatSign2(e.target.value)} className="input-field">
              {signs.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </div>
        </div>
        <button onClick={calculateCompatibility} disabled={compatLoading} className="btn-primary w-full md:w-auto bg-beige-500 hover:bg-beige-600">
          {compatLoading ? 'Calcul...' : 'Tester la compatibilité'}
        </button>
        {compatResult && (
          <div className="mt-8 bg-beige-50 rounded-xl p-6 text-center">
            <p className="text-lg font-serif text-zen-800 mb-2">{compatResult.sign1} & {compatResult.sign2}</p>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-full max-w-xs bg-beige-200 rounded-full h-4">
                <div className="bg-zen-500 h-4 rounded-full" style={{ width: compatResult.compatibility + '%' }} />
              </div>
              <span className="text-xl font-bold text-zen-700">{compatResult.compatibility}%</span>
            </div>
            <p className="text-zen-700">{compatResult.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
