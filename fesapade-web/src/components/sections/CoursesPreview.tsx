import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fetchStrapiSafe } from '@/lib/strapi';
import type { StrapiResponse, Course } from '@/types/strapi';

const nivelColor: Record<string, string> = {
  principiante: 'bg-sky-50 border-sky-200',
  intermedio:   'bg-amber-50 border-amber-200',
  avanzado:     'bg-emerald-50 border-emerald-200',
};

const nivelTag: Record<string, string> = {
  principiante: 'Para principiantes',
  intermedio:   'Formación completa',
  avanzado:     'Con licencia',
};

const staticCourses = [
  {
    titulo: 'Salto tándem',
    descripcion: 'Tu primera experiencia en caída libre acompañado de un instructor certificado. No se requiere experiencia previa.',
    precio: 0,
    moneda: '',
    nivel: 'principiante' as const,
    slug: 'salto-tandem',
  },
  {
    titulo: 'Curso AFF',
    descripcion: 'Accelerated Freefall: el programa completo para convertirte en paracaidista independiente. 8 niveles de formación.',
    precio: 0,
    moneda: '',
    nivel: 'intermedio' as const,
    slug: 'curso-aff',
  },
  {
    titulo: 'Fun Jump',
    descripcion: 'Ya tienes licencia? Únete a nuestras jornadas de saltos grupales sobre el cielo de El Salvador.',
    precio: 0,
    moneda: '',
    nivel: 'avanzado' as const,
    slug: 'fun-jump',
  },
];

function formatPrice(precio: number, moneda: string): string {
  if (!precio) return 'Consultar';
  return `$${precio}`;
}

export default async function CoursesPreview() {
  const data = await fetchStrapiSafe<StrapiResponse<Course[]>>(
    'courses?sort=destacado:desc&pagination[pageSize]=3'
  );

  const courses: Pick<Course, 'titulo' | 'descripcion' | 'precio' | 'moneda' | 'nivel' | 'slug'>[] =
    data?.data?.length ? data.data : staticCourses;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b4a] mb-4">
            Cursos & Fun Jumps
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Desde tu primer salto hasta convertirte en instructor. Tenemos un
            programa para cada etapa de tu camino.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {courses.map((c) => (
            <div
              key={c.slug}
              className={`rounded-2xl border-2 p-8 transition-all hover:-translate-y-1 hover:shadow-md ${
                nivelColor[c.nivel] ?? 'bg-gray-50 border-gray-200'
              }`}
            >
              <span className="inline-block text-xs font-semibold text-[#1a2b4a] bg-white/80 px-3 py-1 rounded-full mb-4">
                {nivelTag[c.nivel] ?? c.nivel}
              </span>
              <h3 className="text-xl font-bold text-[#1a2b4a] mb-3">{c.titulo}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{c.descripcion}</p>
              <div className="text-2xl font-extrabold text-[#c8a84b]">
                {formatPrice(c.precio, c.moneda)}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 text-[#1a2b4a] font-semibold hover:text-[#c8a84b] transition-colors"
          >
            Ver todos los cursos y precios
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
