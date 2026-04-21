import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { fetchStrapiSafe, getStrapiImageUrl } from '@/lib/strapi';
import type { StrapiResponse, NewsItem } from '@/types/strapi';

// --- static fallback articles ---
const staticArticles: Record<string, Omit<NewsItem, 'id' | 'imagen'> & { imagen: null }> = {
  'fun-jump-enero-2025': {
    titulo: 'Fun Jump – Enero 2025',
    fecha: '2025-01-15',
    resumen: 'Vivimos una jornada increíble con más de 30 saltos realizados.',
    categoria: 'Eventos',
    slug: 'fun-jump-enero-2025',
    imagen: null,
    contenido: `Vivimos una jornada increíble con más de 30 saltos realizados durante nuestro Fun Jump de enero. La comunidad FESAPADE sigue creciendo y cada evento nos demuestra la pasión que compartimos por los aerodeportes.

Contamos con la participación de paracaidistas de diferentes niveles, desde quienes completaron su primer salto autónomo hasta instructores con cientos de saltos. El cielo de El Salvador nos regaló condiciones perfectas.

Agradecemos a todos los participantes y al equipo de FESAPADE por hacer posible este evento. ¡Nos vemos en el próximo!`,
  },
  'nuevo-instructor-certificado': {
    titulo: 'Nuevo instructor certificado USPA',
    fecha: '2024-12-03',
    resumen: 'Nos alegra anunciar que uno de nuestros deportistas ha completado su certificación como instructor AFF.',
    categoria: 'Logros',
    slug: 'nuevo-instructor-certificado',
    imagen: null,
    contenido: `Nos alegra anunciar que uno de nuestros deportistas más destacados ha completado con éxito su certificación como instructor AFF (Accelerated Freefall) ante la United States Parachute Association (USPA).

Este logro representa meses de dedicación, formación teórica y práctica intensiva. Con este nuevo instructor certificado, FESAPADE amplía su capacidad para formar paracaidistas en El Salvador bajo los más altos estándares internacionales.

Felicitamos al nuevo instructor y le deseamos muchos éxitos en esta nueva etapa de su carrera.`,
  },
  'campeonato-centroamericano': {
    titulo: 'Participación en Campeonato Centroamericano',
    fecha: '2024-11-20',
    resumen: 'El equipo FESAPADE compitió en el Campeonato Centroamericano representando a El Salvador.',
    categoria: 'Competencias',
    slug: 'campeonato-centroamericano',
    imagen: null,
    contenido: `El equipo FESAPADE tuvo el honor de representar a El Salvador en el Campeonato Centroamericano de Paracaidismo. Nuestros atletas compitieron en las modalidades de precisión de aterrizaje y formaciones en caída libre.

La experiencia fue enormemente enriquecedora: compartimos con la comunidad regional, aprendimos de los mejores y demostramos el nivel del paracaidismo salvadoreño en el ámbito centroamericano.

Seguimos trabajando para seguir creciendo y representar a El Salvador con orgullo.`,
  },
};

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

export async function generateStaticParams() {
  const data = await fetchStrapiSafe<StrapiResponse<NewsItem[]>>(
    'news-items?fields[0]=slug'
  );
  const strapiSlugs = data?.data?.map((item) => ({ slug: item.slug })) ?? [];
  if (strapiSlugs.length) return strapiSlugs;
  return Object.keys(staticArticles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchStrapiSafe<StrapiResponse<NewsItem[]>>(
    `news-items?populate=imagen&filters[slug][$eq]=${slug}`
  );
  const article = data?.data?.[0] ?? staticArticles[slug];
  if (!article) return {};
  return {
    title: `${article.titulo} | FESAPADE`,
    description: article.resumen,
  };
}

export default async function NoticiaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await fetchStrapiSafe<StrapiResponse<NewsItem[]>>(
    `news-items?populate=imagen&filters[slug][$eq]=${slug}`
  );

  const article: (NewsItem & { imagen: NewsItem['imagen'] | null }) | (typeof staticArticles)[string] | undefined =
    data?.data?.[0] ?? staticArticles[slug];

  if (!article) notFound();

  const imagenUrl = article.imagen ? getStrapiImageUrl(article.imagen.url) : null;
  const imagenAlt = article.imagen?.alternativeText ?? article.titulo;
  const categoria = article.categoria ?? '';

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-[#1a2b4a] text-white py-20 text-center">
        <p className="text-[#c8a84b] text-sm font-semibold uppercase tracking-widest mb-3">
          FESAPADE — Noticias
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold max-w-3xl mx-auto px-4">
          {article.titulo}
        </h1>
      </div>

      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            {categoria && (
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  categoryColor[categoria] ?? 'bg-gray-100 text-gray-600'
                }`}
              >
                {categoria}
              </span>
            )}
            <span className="text-sm text-gray-400">{formatDate(article.fecha)}</span>
          </div>

          {imagenUrl ? (
            <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-10">
              <Image src={imagenUrl} alt={imagenAlt} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-full h-64 rounded-2xl bg-gradient-to-br from-[#1a2b4a] to-[#2d4a7a] flex items-center justify-center text-white text-7xl mb-10">
              🪂
            </div>
          )}

          <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
            {article.contenido.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 text-[#1a2b4a] font-semibold hover:text-[#c8a84b] transition-colors"
            >
              <ArrowLeft size={16} />
              Volver a noticias
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
