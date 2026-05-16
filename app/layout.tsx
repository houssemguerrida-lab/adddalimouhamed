import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AdddaliMouhamed - Astrologie & Bien-être',
  description: 'Consultations astrologiques personnalisées par AdddaliMouhamed.',
  keywords: 'astrologie, horoscope, consultation, signe astrologique, AdddaliMouhamed',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <header className="bg-white/80 backdrop-blur-md border-b border-beige-200 sticky top-0 z-50">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-2xl font-serif text-zen-800 font-bold tracking-wide">
              Adddali<span className="text-beige-600">Mouhamed</span>
            </a>
            <div className="flex gap-6 text-sm font-medium">
              <a href="/" className="text-zen-700 hover:text-zen-900 transition-colors">Accueil</a>
              <a href="/horoscope" className="text-zen-700 hover:text-zen-900 transition-colors">Horoscope</a>
              <a href="/consultation" className="text-zen-700 hover:text-zen-900 transition-colors">Consultation</a>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-zen-950 text-beige-200 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm">
            <p className="font-serif text-lg mb-2">AdddaliMouhamed</p>
            <p className="text-beige-400">© {new Date().getFullYear()} - Consultations astrologiques</p>
            <p className="text-beige-500 mt-1">Paix • Sérénité • Sagesse</p>
          </div>
        </footer>
      </body>
    </html>
  )
}