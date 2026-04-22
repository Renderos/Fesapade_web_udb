import type { Metadata } from 'next';
import Image from 'next/image';
import { fetchStrapiSafe, fetchPageHeaderBgs, getStrapiImageUrl } from '@/lib/strapi';
import type { StrapiResponse, TeamMember } from '@/types/strapi';
import PageHeader from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'Quiénes somos | FESAPADE',
  description:
    'Conoce a la Federación Salvadoreña de Paracaidismo y Aerodeportes: nuestra misión, visión y equipo.',
};

const staticTeam = [
  { id: 1, nombre: 'Nombre Apellido', cargo: 'Presidente', foto: null },
  { id: 2, nombre: 'Nombre Apellido', cargo: 'Director Técnico', foto: null },
  { id: 3, nombre: 'Nombre Apellido', cargo: 'Instructor Jefe', foto: null },
  { id: 4, nombre: 'Nombre Apellido', cargo: 'Secretaria', foto: null },
];

function initials(nombre: string): string {
  return nombre
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default async function QuienesSomosPage() {
  const [data, pageHeaderData] = await Promise.all([
    fetchStrapiSafe<StrapiResponse<TeamMember[]>>('team-members?populate=foto&sort=id:asc'),
    fetchPageHeaderBgs(),
  ]);
  const bgUrl = pageHeaderData?.data?.quienesSomosBg
    ? getStrapiImageUrl(pageHeaderData.data.quienesSomosBg.url)
    : null;

  const team = (data?.data?.length ? data.data : staticTeam) as Array<{
    id: number;
    nombre: string;
    cargo: string;
    foto: import('@/types/strapi').StrapiImage | null | undefined;
  }>;

  return (
    <div>
      <PageHeader title="Quiénes somos" strapiImageUrl={bgUrl} />

      {/* About */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 leading-relaxed text-lg">
            La Federación Salvadoreña de Paracaidismo y Aerodeportes -FESAPADE- es el organismo
            rector y máxima autoridad de todas las actividades del Paracaidismo y todas las demás
            actividades Aerodeportivas en todas sus modalidades y categorías, en todo el país.
          </p>
        </div>
      </section>

      {/* Affiliations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1a2b4a] text-center mb-12">
            Afiliaciones y reconocimientos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* INDES */}
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-sm border border-gray-100 hover:border-[#c8a84b] transition-colors">
              <div className="relative w-24 h-24">
                <Image src="/images/INDES_Logo1.jpg" alt="INDES" fill className="object-contain" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-[#1a2b4a] text-lg mb-1">INDES</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Reconocida e inscrita en el Instituto Nacional de los Deportes de El Salvador y
                  miembro del Comité Olímpico de El Salvador (COE).
                </p>
              </div>
            </div>

            {/* COLPAR */}
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-sm border border-gray-100 hover:border-[#c8a84b] transition-colors">
              <div className="relative w-24 h-24">
                <Image src="/images/COLPAR_logo.jpg" alt="COLPAR" fill className="object-contain" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-[#1a2b4a] text-lg mb-1">COLPAR</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Afiliada a la Confederación Latinoamericana de Paracaidismo.
                </p>
              </div>
            </div>

            {/* USPA */}
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-sm border border-gray-100 hover:border-[#c8a84b] transition-colors">
              <div className="relative w-24 h-24">
                <Image src="/images/USPA_logo.jpg" alt="USPA" fill className="object-contain" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-[#1a2b4a] text-lg mb-1">USPA</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Afiliada a la United States Parachute Association y reconocida por la Federación
                  Aeronáutica Internacional (FAI).
                </p>
              </div>
            </div>

            {/* FAI */}
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-sm border border-gray-100 hover:border-[#c8a84b] transition-colors">
              <div className="relative w-24 h-24">
                <Image src="/images/fai-logo-600.jpg" alt="FAI" fill className="object-contain" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-[#1a2b4a] text-lg mb-1">FAI / IPC</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Todos los campeonatos internacionales de paracaidismo FAI se realizan bajo la
                  dirección de la Comisión Internacional de Paracaidismo (IPC).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-[#1a2b4a] mb-6">Nuestra misión</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Promover, organizar y desarrollar el paracaidismo deportivo y de exhibición en todas
                sus modalidades a fin de formar atletas de alto rendimiento, contribuyendo de esta
                manera al desarrollo de cualidades físicas y morales, y promoviendo altos principios
                cívicos en todos los Paracaidistas que la integran, y fomentando que se ponga en todo
                momento, el nombre de nuestro país en alto.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#1a2b4a] mb-6">Nuestra visión</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Ser una federación integral en el desarrollo, fomento y práctica del paracaidismo
                deportivo y de exhibición; ser líderes a nivel Regional, manteniendo un alto espíritu
                de competencia y sólidas convicciones por enaltecer nuestros símbolos patrios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1a2b4a] text-center mb-12">Nuestros valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(
              [
                { label: 'Seguridad Operacional', desc: 'La seguridad es nuestra prioridad en cada salto. Actuamos con criterio, preparación y respeto absoluto por los protocolos.' },
                { label: 'Resiliencia', desc: 'Nos adaptamos, aprendemos y respondemos con firmeza ante cada reto.' },
                { label: 'Integridad', desc: 'Actuamos con honestidad, respeto y transparencia en todo momento.' },
                { label: 'Excelencia Técnica', desc: 'Perfeccionamos habilidades y ejecutamos con precisión en cada salto.' },
                { label: 'Disciplina', desc: 'Seguimos procesos y estándares con constancia y rigor.' },
                { label: 'Unidad', desc: 'Coordinamos, confiamos y actuamos como un solo equipo.' },
              ] as const
            ).map((v) => (
              <div
                key={v.label}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-[#c8a84b] transition-colors"
              >
                <div className="font-bold text-[#1a2b4a] mb-2">{v.label}</div>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#1a2b4a] mb-12">Junta Directiva 2025 - 2029</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => {
              const fotoUrl = member.foto ? getStrapiImageUrl(member.foto.url) : null;
              const fotoAlt = member.foto?.alternativeText ?? member.nombre;
              return (
                <div key={member.id} className="flex flex-col items-center gap-3">
                  {fotoUrl ? (
                    <div className="relative w-20 h-20 rounded-full overflow-hidden">
                      <Image src={fotoUrl} alt={fotoAlt} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#1a2b4a] flex items-center justify-center text-white font-bold text-xl">
                      {initials(member.nombre)}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-[#1a2b4a]">{member.nombre}</div>
                    <div className="text-sm text-gray-500">{member.cargo}</div>
                  </div>
                </div>
              );
            })}
          </div>
          {!data?.data?.length && (
            <p className="mt-8 text-gray-400 text-sm">
              * Los nombres y fotos del equipo se actualizan desde el CMS.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
