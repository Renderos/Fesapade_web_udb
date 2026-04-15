import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cursos & Fun Jumps | FESAPADE',
  description:
    'Conoce nuestros cursos de paracaidismo y fun jumps en El Salvador. Todos los niveles.',
};

const courses = [
  {
    title: 'Salto Tándem',
    tag: 'Sin experiencia previa',
    tagColor: 'bg-sky-100 text-sky-700',
    description:
      'Vive la emoción de la caída libre acompañado de un instructor certificado. Vuelas atado al instructor durante todo el salto desde aproximadamente 4,000 metros de altura.',
    includes: ['Instrucción pre-salto', 'Equipo completo', 'Certificado', 'Fotos y video (opcional)'],
    price: '$XXX',
    duration: '~3 horas (incluyendo preparación)',
    cta: 'Reservar tándem',
  },
  {
    title: 'Curso AFF (Accelerated Freefall)',
    tag: 'Formación completa',
    tagColor: 'bg-amber-100 text-amber-700',
    description:
      'El programa oficial para obtener tu licencia de paracaidismo. 8 niveles de formación con instructores certificados por la USPA. Al finalizarlo serás un paracaidista independiente.',
    includes: [
      'Material didáctico',
      'Curso teórico',
      '8 niveles de saltos',
      'Evaluación y certificación',
    ],
    price: '$X,XXX',
    duration: 'Variable (días/semanas)',
    cta: 'Consultar AFF',
  },
  {
    title: 'Fun Jump',
    tag: 'Requiere licencia',
    tagColor: 'bg-emerald-100 text-emerald-700',
    description:
      'Si ya tienes licencia de paracaidismo (A, B, C o D), únete a nuestras jornadas de saltos grupales. El cielo de El Salvador te espera.',
    includes: ['Acceso a zonas de salto', 'Logística aérea', 'Briefing previo'],
    price: '$XX',
    duration: 'Jornada completa',
    cta: 'Ver fechas',
  },
  {
    title: 'Canopy Piloting (CP)',
    tag: 'Avanzado',
    tagColor: 'bg-purple-100 text-purple-700',
    description:
      'Formación en control de paracaídas en etapas avanzadas. Para paracaidistas con experiencia que quieren perfeccionar su apertura y aterrizaje.',
    includes: ['Entrenamiento en tierra', 'Supervisión especializada', 'Evaluación técnica'],
    price: 'Consultar',
    duration: 'A definir con instructor',
    cta: 'Consultar CP',
  },
];

export default function CursosPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-[#1a2b4a] text-white py-20 text-center">
        <p className="text-[#c8a84b] text-sm font-semibold uppercase tracking-widest mb-3">
          FESAPADE
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Cursos & Fun Jumps
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Tenemos un programa para cada etapa de tu aventura. Desde tu primer
          salto hasta convertirte en instructor.
        </p>
      </div>

      {/* Courses grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div
                key={course.title}
                className="rounded-2xl border border-gray-100 p-8 hover:shadow-lg hover:border-[#c8a84b] transition-all"
              >
                <span
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${course.tagColor}`}
                >
                  {course.tag}
                </span>

                <h2 className="text-2xl font-bold text-[#1a2b4a] mb-3">
                  {course.title}
                </h2>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  {course.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {course.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-[#c8a84b]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">{course.duration}</div>
                    <div className="text-3xl font-extrabold text-[#1a2b4a]">
                      {course.price}
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
