import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchStrapiSafe, fetchPageHeaderBgs, getStrapiImageUrl } from '@/lib/strapi';
import type { StrapiResponse, NewsItem, GalleryItem } from '@/types/strapi';
import PageHeader from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'Noticias & Galería | FESAPADE',
  description: 'Últimas noticias, eventos y galería fotográfica de FESAPADE.',
};

const staticNews = [
  {
    id: 1,
    slug: 'fun-jump-enero-2025',
    titulo: 'Fun Jump – Enero 2025',
    fecha: '2025-01-15',
    resumen: 'Vivimos una jornada increíble con más de 30 saltos realizados. La comunidad FESAPADE sigue creciendo.',
    categoria: 'Eventos',
    imagen: null,
  },
  {
    id: 2,
    slug: 'nuevo-instructor-certificado',
    titulo: 'Nuevo instructor certificado USPA',
    fecha: '2024-12-03',
    resumen: 'Nos alegra anunciar que uno de nuestros deportistas ha completado su certificación como instructor AFF.',
    categoria: 'Logros',
    imagen: null,
  },
  {
    id: 3,
    slug: 'campeonato-centroamericano',
    titulo: 'Participación en Campeonato Centroamericano',
    fecha: '2024-11-20',
    resumen: 'El equipo FESAPADE compitió en el Campeonato Centroamericano de Paracaidismo representando a El Salvador.',
    categoria: 'Competencias',
    imagen: null,
  },
];

const categoryColor: Record<string, string> = {
  Eventos: 'bg-sky-100 text-sky-700',
  Logros: 'bg-amber-100 text-amber-700',
  Competencias: 'bg-emerald-100 text-emerald-700',
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-SV', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function NoticiasPage() {
  const [newsData, galleryData, pageHeaderData] = await Promise.all([
    fetchStrapiSafe<StrapiResponse<NewsItem[]>>('news-items?populate=imagen&sort=fecha:desc&status=published'),
    fetchStrapiSafe<StrapiResponse<GalleryItem[]>>('gallery-items?populate=imagen&status=published'),
    fetchPageHeaderBgs(),
  ]);
  const bgUrl = pageHeaderData?.data?.noticiasBg
    ? getStrapiImageUrl(pageHeaderData.data.noticiasBg.url)
    : null;

  const news = newsData?.data?.length ? newsData.data : staticNews;
  const gallery = galleryData?.data ?? [];

  return (
    <div>
      <PageHeader title="Noticias & Galería" strapiImageUrl={bgUrl} />

      {/* News */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1a2b4a] mb-8">Últimas noticias</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => {
              const imagenUrl =
                'imagen' in item && item.imagen
                  ? getStrapiImageUrl((item.imagen as { url: string }).url)
                  : null;
              const imagenAlt =
                'imagen' in item && item.imagen
                  ? ((item.imagen as { alternativeText?: string | null }).alternativeText ?? item.titulo)
                  : item.titulo;
              const categoria = item.categoria ?? '';
              const dateStr = formatDate(item.fecha);

              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-[#c8a84b] transition-all"
                >
                  {imagenUrl ? (
                    <div className="relative h-48 w-full">
                      <Image src={imagenUrl} alt={imagenAlt} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-[#1a2b4a] to-[#2d4a7a] flex items-center justify-center text-white text-5xl">
                      🪂
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {categoria && (
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            categoryColor[categoria] ?? 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {categoria}
                        </span>
                      )}
                      <span className="text-xs text-gray-400">{dateStr}</span>
                    </div>
                    <h3 className="font-bold text-[#1a2b4a] mb-2">{item.titulo}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.resumen}</p>
                    <Link
                      href={`/noticias/${item.slug}`}
                      className="text-sm font-semibold text-[#c8a84b] hover:underline"
                    >
                      Leer más →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1a2b4a] mb-8">Galería</h2>

          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src={getStrapiImageUrl(item.imagen.url)}
                    alt={item.imagen.alternativeText ?? item.titulo}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </section>
    </div>
  );
}
