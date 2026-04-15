import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Noticias & Galería | FESAPADE',
  description: 'Últimas noticias, eventos y galería fotográfica de FESAPADE.',
};

// Placeholder noticias - vendrán de Strapi
const news = [
  {
    id: 1,
    slug: 'fun-jump-enero-2025',
    title: 'Fun Jump – Enero 2025',
    date: '15 de enero, 2025',
    summary:
      'Vivimos una jornada increíble con más de 30 saltos realizados. La comunidad FESAPADE sigue creciendo.',
    category: 'Eventos',
  },
  {
    id: 2,
    slug: 'nuevo-instructor-certificado',
    title: 'Nuevo instructor certificado USPA',
    date: '3 de diciembre, 2024',
    summary:
      'Nos alegra anunciar que uno de nuestros deportistas ha completado su certificación como instructor AFF.',
    category: 'Logros',
  },
  {
    id: 3,
    slug: 'campeonato-centroamericano',
    title: 'Participación en Campeonato Centroamericano',
    date: '20 de noviembre, 2024',
    summary:
      'El equipo FESAPADE compitió en el Campeonato Centroamericano de Paracaidismo representando a El Salvador.',
    category: 'Competencias',
  },
];

const categoryColor: Record<string, string> = {
  Eventos: 'bg-sky-100 text-sky-700',
  Logros: 'bg-amber-100 text-amber-700',
  Competencias: 'bg-emerald-100 text-emerald-700',
};

export default function NoticiasPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-[#1a2b4a] text-white py-20 text-center">
        <p className="text-[#c8a84b] text-sm font-semibold uppercase tracking-widest mb-3">
          FESAPADE
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Noticias & Galería
        </h1>
      </div>

      {/* News */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1a2b4a] mb-8">
            Últimas noticias
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-[#c8a84b] transition-all"
              >
                {/* Placeholder image */}
                <div className="h-48 bg-gradient-to-br from-[#1a2b4a] to-[#2d4a7a] flex items-center justify-center text-white text-5xl">
                  🪂
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        categoryColor[item.category] || 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <h3 className="font-bold text-[#1a2b4a] mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {item.summary}
                  </p>
                  <Link
                    href={`/noticias/${item.slug}`}
                    className="text-sm font-semibold text-[#c8a84b] hover:underline"
                  >
                    Leer más →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery placeholder */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1a2b4a] mb-8">Galería</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-gradient-to-br from-[#1a2b4a]/20 to-[#c8a84b]/20 flex items-center justify-center text-4xl"
              >
                🪂
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-6">
            Las imágenes se cargan desde el CMS una vez configurado.
          </p>
        </div>
      </section>
    </div>
  );
}
