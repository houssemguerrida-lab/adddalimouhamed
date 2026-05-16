'use client'

import { useState, useEffect } from 'react'

function generateSlots() {
  const slots: { date: string; times: string[]; dateValue: string }[] = []
  const today = new Date()
  for (let i = 1; i <= 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    if (date.getDay() === 0) continue
    const dateValue = date.toISOString().split('T')[0]
    const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']
    slots.push({ date: dateValue, times, dateValue })
  }
  return slots
}

export default function ConsultationPage() {
  const [step, setStep] = useState('form')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [bookingStatus, setBookingStatus] = useState('pending')
  const [whatsappLink, setWhatsappLink] = useState('')
  const slots = generateSlots()

  useEffect(() => {
    if (step !== 'waiting' || !email) return
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/bookings?email=' + encodeURIComponent(email))
        const data = await res.json()
        if (data.found && data.booking) {
          setBookingStatus(data.booking.status)
          if (data.booking.status === 'confirmed') {
            setWhatsappLink(data.booking.whatsappLink)
            clearInterval(interval)
          }
        }
      } catch (error) { console.error(error) }
    }, 10000)
    return () => clearInterval(interval)
  }, [step, email])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return
    setLoading(true)
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, date: selectedDate, time: selectedTime }),
      })
      const data = await res.json()
      if (data.success) {
        setBookingStatus('pending')
        setStep('waiting')
      }
    } catch (error) { console.error(error) }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif text-center text-zen-900 mb-4">Consultation Privée</h1>
      <p className="text-center text-zen-600 mb-4">45 minutes - 10 dollars - Visio WhatsApp</p>
      {step === 'form' && (
        <div className="card">
          <div className="text-center mb-8">
            <p className="text-3xl font-bold text-zen-800">10 $</p>
            <p className="text-zen-500 text-sm">Paiement après confirmation</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zen-700 mb-3">Date souhaitee</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {slots.map((slot) => (
                  <button key={slot.dateValue} type="button" onClick={() => { setSelectedDate(slot.dateValue); setSelectedTime('') }}
                    className={'p-3 rounded-xl text-sm text-left border transition-all ' + (selectedDate === slot.dateValue ? 'border-zen-500 bg-zen-50 ring-2 ring-zen-300' : 'border-beige-200 hover:border-beige-400 bg-white')}>
                    <span className="block text-zen-800 font-medium">{slot.dateValue}</span>
                  </button>
                ))}
              </div>
            </div>
            {selectedDate && (
              <div>
                <label className="block text-sm font-medium text-zen-700 mb-3">Heure souhaitee</label>
                <div className="grid grid-cols-4 gap-2">
                  {slots.find((s) => s.dateValue === selectedDate)?.times.map((time) => (
                    <button key={time} type="button" onClick={() => setSelectedTime(time)}
                      className={'p-3 rounded-xl text-sm text-center border transition-all ' + (selectedTime === time ? 'border-zen-500 bg-zen-50 ring-2 ring-zen-300 text-zen-800 font-medium' : 'border-beige-200 hover:border-beige-400 bg-white text-zen-700')}>
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-zen-700 mb-2">Votre nom</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="input-field" placeholder="Votre nom complet" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zen-700 mb-2">Votre email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="email@exemple.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zen-700 mb-2">Votre question</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="input-field h-32 resize-none" placeholder="Que souhaitez-vous explorer ?" />
            </div>
            <button type="submit" disabled={loading || !selectedDate || !selectedTime} className="btn-primary w-full disabled:opacity-50">
              {loading ? 'Envoi...' : 'Demander ce creneau'}
            </button>
          </form>
        </div>
      )}
      {step === 'waiting' && (
        <div className="card text-center">
          {bookingStatus === 'pending' && (
            <>
              <div className="text-6xl mb-6">⏳</div>
              <h2 className="text-2xl font-serif text-zen-800 mb-4">Demande envoyee</h2>
              <p className="text-zen-600 mb-2">Creneau en attente de confirmation.</p>
              <div className="animate-pulse bg-beige-100 rounded-full h-3 w-48 mx-auto mb-4" />
              <p className="text-xs text-zen-400">Verification automatique en cours...</p>
            </>
          )}
          {bookingStatus === 'confirmed' && (
            <>
              <div className="text-6xl mb-6">✅</div>
              <h2 className="text-2xl font-serif text-zen-800 mb-4">Creneau confirme !</h2>
              <p className="text-zen-600 mb-4">Votre seance est confirmee.</p>
              <div className="space-y-4">
                <a href="https://paypal.me/06519578/10" target="_blank" rel="noopener noreferrer" className="bg-[#0070ba] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#005ea6] transition-all duration-300 shadow-lg inline-block w-full md:w-auto">
                  Payer 10 $ avec PayPal
                </a>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp inline-flex mx-auto text-lg px-6 py-3">
                  Rejoindre la visio WhatsApp
                </a>
              </div>
            </>
          )}
          {bookingStatus === 'rejected' && (
            <>
              <div className="text-6xl mb-6">😔</div>
              <h2 className="text-2xl font-serif text-zen-800 mb-4">Creneau non disponible</h2>
              <button onClick={() => setStep('form')} className="btn-primary">Choisir un autre creneau</button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
