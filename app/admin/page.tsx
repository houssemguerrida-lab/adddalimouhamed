'use client'

import { useState, useEffect } from 'react'

interface Booking {
  id: string; name: string; email: string; message: string; date: string; time: string
  status: string; createdAt: string; whatsappLink: string
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')

  const login = () => {
    if (password === 'admin2024Adddali') {
      setIsLoggedIn(true)
      localStorage.setItem('admin_password', password)
      fetchBookings()
    } else { alert('Mot de passe incorrect') }
  }

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin?password=admin2024Adddali')
      const data = await res.json()
      if (Array.isArray(data)) setBookings(data.reverse())
    } catch (error) { console.error(error) }
    setLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status, password: 'admin2024Adddali' }) })
      const data = await res.json()
      if (data.success) fetchBookings()
    } catch (error) { console.error(error) }
  }

  useEffect(() => {
    const saved = localStorage.getItem('admin_password')
    if (saved === 'admin2024Adddali') { setPassword(saved); setIsLoggedIn(true); fetchBookings() }
  }, [])

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-24">
        <div className="card text-center">
          <h1 className="text-2xl font-serif text-zen-800 mb-6">Administration</h1>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && login()} className="input-field mb-4" placeholder="Mot de passe" />
          <button onClick={login} className="btn-primary w-full">Connexion</button>
        </div>
      </div>
    )
  }

  const filtered = bookings.filter((b) => filter === 'all' || b.status === filter)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-zen-900">Tableau de bord</h1>
        <button onClick={() => { setIsLoggedIn(false); localStorage.removeItem('admin_password') }} className="text-sm text-zen-500 hover:text-zen-700">Deconnexion</button>
      </div>
      <div className="flex gap-2 mb-6">
        {['all','pending','confirmed','rejected'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={'px-4 py-2 rounded-full text-sm ' + (filter === f ? 'bg-zen-600 text-white' : 'bg-beige-100 text-zen-600')}>{f}</button>
        ))}
        <button onClick={fetchBookings} className="ml-auto text-sm text-zen-500">Actualiser</button>
      </div>
      {loading ? <p className="text-center py-12">Chargement...</p> : filtered.length === 0 ? <p className="text-center py-12">Aucune reservation</p> : (
        <div className="space-y-4">
          {filtered.map((b) => (
            <div key={b.id} className="card p-5">
              <p className="font-semibold">{b.name} - {b.email}</p>
              <p className="text-sm">{b.date} a {b.time}</p>
              <p className="text-xs">Statut: {b.status}</p>
              {b.status === 'pending' && (
                <div className="flex gap-2 mt-2">
                  <button onClick={() => updateStatus(b.id, 'confirmed')} className="bg-green-600 text-white px-3 py-1 rounded">Confirmer</button>
                  <button onClick={() => updateStatus(b.id, 'rejected')} className="bg-red-100 text-red-700 px-3 py-1 rounded">Refuser</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
