import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchStrapiSafe, fetchPageHeaderBgs, getStrapiImageUrl } from '@/lib/strapi';
import type { StrapiResponse, Course } from '@/types/strapi';
import PageHeader from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'Cursos & Fun Jumps | FESAPADE',
  description:
    'Conoce nuestros cursos de paracaidismo y fun jumps en El Salvador. Todos los niveles.',
};

// --- static fallback ---
const staticCourses = [
  {
    titulo: 'Salto Tándem',
    nivel: 'principiante' as const,
    descripcion:
      'Vive la emoción de la caída libre acompañado de un instructor certificado. Vuelas atado al instructor durante todo el salto desde aproximadamente 4,000 metros de altura.',
    incluye: ['Instrucción pre-salto', 'Equipo completo', 'Certificado', 'Fotos y video (opcional)'],
    precioDisplay: '$XXX',
    duracion: '~3 horas (incluyendo preparación)',
    cta: 'Reservar tándem',
    slug: 'salto-tandem',
    imagen: null,
  },
  {
    titulo: 'Curso AFF (Accelerated Freefall)',
    nivel: 'intermedio' as const,
    descripcion:
      'El programa oficial para obtener tu licencia de paracaidismo. 8 niveles de formación con instructores certificados por la USPA.',
    incluye: ['Material didáctico', 'Curso teórico', '8 niveles de saltos', 'Evaluación y certificación'],
    precioDisplay: '$X,XXX',
    duracion: 'Variable (días/semanas)',
    cta: 'Consultar AFF',
    slug: 'curso-aff',
    imagen: null,
  },
  {
    titulo: 'Fun Jump',
    nivel: 'avanzado' as const,
    descripcion:
      'Si ya tienes licencia de paracaidismo (A, B, C o D), únete a nuestras jornadas de saltos grupales.',
    incluye: ['Acceso a zonas de salto', 'Logística aérea', 'Briefing previo'],
    precioDisplay: '$XX',
    duracion: 'Jornada completa',
    cta: 'Ver fechas',
    slug: 'fun-jump',
    imagen: null,
  },
  {
    titulo: 'Canopy Piloting (CP)',
    nivel: 'avanzado' as const,
    descripcion:
      'Formación en control de paracaídas en etapas avanzadas. Para paracaidistas con experiencia.',
    incluye: ['Entrenamiento en tierra', 'Supervisión especializada', 'Evaluación técnica'],
    precioDisplay: 'Consultar',
    duracion: 'A definir con instructor',
    cta: 'Consultar CP',
    slug: 'canopy-piloting',
    imagen: null,
  },
];

const nivelStyle: Record<string, { tag: string; tagColor: string }> = {
  principiante: { tag: 'Sin experiencia previa', tagColor: 'bg-sky-100 text-sky-700' },
  intermedio:   { tag: 'Formación completa',     tagColor: 'bg-amber-100 text-amber-700' },
  avanzado:     { tag: 'Avanzado',               tagColor: 'bg-purple-100 text-purple-700' },
};

function formatPrecio(precio: number, moneda: string): string {
  if (!precio) return 'Consultar';
  return moneda ? `$${precio} ${moneda}` : `$${precio}`;
}

type DisplayCourse = {
  titulo: string;
  tag: string;
  tagColor: string;
  descripcion: string;
  precioDisplay: string;
  duracion: string;
  cta: string;
  slug: string;
  imagenUrl: string | null;
  imagenAlt: string;
};

function fromStrapi(c: Course): DisplayCourse {
  const style = nivelStyle[c.nivel] ?? { tag: c.nivel, tagColor: 'bg-gray-100 text-gray-600' };
  return {
    titulo: c.titulo,
    tag: style.tag,
    tagColor: style.tagColor,
    descripcion: c.descripcion,
    precioDisplay: formatPrecio(c.precio, c.moneda),
    duracion: c.duracion,
    cta: 'Consultar',
    slug: c.slug,
    imagenUrl: c.imagen ? getStrapiImageUrl(c.imagen.url) : null,
    imagenAlt: c.imagen?.alternativeText ?? c.titulo,
  };
}

function fromStatic(c: (typeof staticCourses)[number]): DisplayCourse {
  const style = nivelStyle[c.nivel] ?? { tag: c.nivel, tagColor: 'bg-gray-100 text-gray-600' };
  return {
    titulo: c.titulo,
    tag: style.tag,
    tagColor: style.tagColor,
    descripcion: c.descripcion,
    precioDisplay: c.precioDisplay,
    duracion: c.duracion,
    cta: c.cta,
    slug: c.slug,
    imagenUrl: null,
    imagenAlt: c.titulo,
  };
}

export default async function CursosPage() {
  const [data, pageHeaderData] = await Promise.all([
    fetchStrapiSafe<StrapiResponse<Course[]>>('courses?populate=imagen&sort=destacado:desc&status=published'),
    fetchPageHeaderBgs(),
  ]);
  const bgUrl = pageHeaderData?.data?.cursosBg
    ? getStrapiImageUrl(pageHeaderData.data.cursosBg.url)
    : null;

  const strapiCourses = Array.isArray(data?.data) && data.data.length > 0 ? data.data : null;
  const courses: DisplayCourse[] = strapiCourses
    ? strapiCourses.map(fromStrapi)
    : staticCourses.map(fromStatic);

  return (
    <div>
      <PageHeader
        title="Cursos & Fun Jumps"
        subtitle="Aprende con el método tradicional: desde la apertura asistida hasta la libertad de la caída libre. Formamos paracaidistas sólidos. ¿Ya tienes experiencia? Súbete al avión y disfruta de nuestros Fun Jumps."
        strapiImageUrl={bgUrl}
      />

      {/* Courses grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div
                key={course.slug}
                className="rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-[#c8a84b] transition-all"
              >
                {course.imagenUrl ? (
                  <div className="relative h-48 w-full">
                    <Image
                      src={course.imagenUrl}
                      alt={course.imagenAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-[#1a2b4a] to-[#2d4a7a] flex items-center justify-center text-white text-6xl">
                    🪂
                  </div>
                )}

                <div className="p-8">
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${course.tagColor}`}>
                    {course.tag}
                  </span>
                  <h2 className="text-2xl font-bold text-[#1a2b4a] mb-3">{course.titulo}</h2>
                  <p className="text-gray-500 mb-6 leading-relaxed">{course.descripcion}</p>

                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">{course.duracion}</div>
                      <div className="text-3xl font-extrabold text-[#1a2b4a]">
                        {course.precioDisplay}
                      </div>
                    </div>
                    <Link
                      href="/contacto"
                      className="px-5 py-2.5 rounded-full bg-[#1a2b4a] text-white text-sm font-semibold hover:bg-[#c8a84b] transition-colors"
                    >
                      {course.cta}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-2xl text-center">
            <p className="text-gray-500 text-sm">
              Los precios son referenciales y pueden variar.{' '}
              <Link href="/contacto" className="text-[#c8a84b] font-semibold hover:underline">
                Contáctanos
              </Link>{' '}
              para información actualizada y reservas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
