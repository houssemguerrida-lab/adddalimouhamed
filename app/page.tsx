import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <section className="relative bg-gradient-to-b from-beige-100 to-beige-50 py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-zen-900 mb-6 leading-tight">
            Découvrez les secrets<br />de votre <span className="text-beige-600">destin</span>
          </h1>
          <p className="text-lg text-zen-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Astrologie traditionnelle et moderne. Calculez gratuitement votre thème astral
            et réservez une consultation personnalisée avec AdddaliMouhamed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/horoscope" className="btn-primary text-center">
              Calculer mon signe gratuitement
            </Link>
            <Link href="/consultation" className="btn-primary text-center bg-beige-500 hover:bg-beige-600">
              Réserver une consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-serif text-center text-zen-900 mb-12">Nos services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="text-5xl mb-4">🌟</div>
            <h3 className="text-xl font-serif text-zen-800 mb-3">Thème astral gratuit</h3>
            <p className="text-zen-600 text-sm leading-relaxed">
              Calculez votre signe solaire, lunaire et ascendant. Découvrez les influences planétaires sur votre personnalité.
            </p>
          </div>
          <div className="card text-center">
            <div className="text-5xl mb-4">💫</div>
            <h3 className="text-xl font-serif text-zen-800 mb-3">Compatibilité amoureuse</h3>
            <p className="text-zen-600 text-sm leading-relaxed">
              Analysez la compatibilité entre deux signes. Amour, amitié, travail : tout est dans les astres.
            </p>
          </div>
          <div className="card text-center">
            <div className="text-5xl mb-4">📞</div>
            <h3 className="text-xl font-serif text-zen-800 mb-3">Consultation privée</h3>
            <p className="text-zen-600 text-sm leading-relaxed">
              Séance individuelle en visio WhatsApp. Une analyse approfondie de votre thème et de vos questions personnelles.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-zen-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-4">Prêt à explorer votre chemin de vie ?</h2>
          <p className="text-zen-100 mb-8 text-lg">
            Une consultation approfondie pour seulement 10 dollars.
          </p>
          <Link href="/consultation" className="bg-beige-400 text-zen-900 px-8 py-4 rounded-full font-semibold hover:bg-beige-300 transition-all duration-300 shadow-lg inline-block">
            Je réserve ma séance
          </Link>
        </div>
      </section>

      <a
        href="https://wa.me/33669395667"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110 z-50 flex items-center gap-2"
        aria-label="Contacter sur WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
        <span className="hidden md:inline font-medium">WhatsApp</span>
      </a>
    </div>
  )
}