import type { Metadata } from 'next';
import Image from 'next/image';
import { fetchStrapiSafe, getStrapiImageUrl } from '@/lib/strapi';
import type { StrapiResponse, TeamMember } from '@/types/strapi';

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
  const data = await fetchStrapiSafe<StrapiResponse<TeamMember[]>>(
    'team-members?populate=foto&sort=id:asc'
  );

  const team = (data?.data?.length ? data.data : staticTeam) as Array<{
    id: number;
    nombre: string;
    cargo: string;
    foto: import('@/types/strapi').StrapiImage | null | undefined;
  }>;

  return (
    <div className="pt-20">
      {/* Page header */}
      <div className="bg-[#1a2b4a] text-white py-20 text-center">
        <p className="text-[#c8a84b] text-sm font-semibold uppercase tracking-widest mb-3">
          FESAPADE
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold">Quiénes somos</h1>
      </div>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-[#1a2b4a] mb-6">Nuestra misión</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Promover, regular y desarrollar el paracaidismo y los aerodeportes en El Salvador,
                garantizando los más altos estándares de seguridad y formación para todos nuestros
                deportistas.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#1a2b4a] mb-6">Nuestra visión</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Ser la federación de referencia en aerodeportes de Centroamérica, reconocida por la
                excelencia en la formación de deportistas y la seguridad en cada salto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1a2b4a] text-center mb-12">Nuestros valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {(
              [
                { label: 'Seguridad', icon: '🛡️' },
                { label: 'Pasión', icon: '❤️' },
                { label: 'Excelencia', icon: '⭐' },
                { label: 'Comunidad', icon: '🤝' },
              ] as const
            ).map((v) => (
              <div
                key={v.label}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:border-[#c8a84b] transition-colors"
              >
                <div className="text-3xl mb-3">{v.icon}</div>
                <div className="font-bold text-[#1a2b4a]">{v.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#1a2b4a] mb-12">Nuestro equipo</h2>
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
