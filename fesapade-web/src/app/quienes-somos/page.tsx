import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quiénes somos | FESAPADE',
  description:
    'Conoce a la Federación Salvadoreña de Paracaidismo y Aerodeportes: nuestra misión, visión y equipo.',
};

const team = [
  { name: 'Nombre Apellido', role: 'Presidente', initials: 'NA' },
  { name: 'Nombre Apellido', role: 'Director Técnico', initials: 'NA' },
  { name: 'Nombre Apellido', role: 'Instructor Jefe', initials: 'NA' },
  { name: 'Nombre Apellido', role: 'Secretaria', initials: 'NA' },
];

export default function QuienesSomosPage() {
  return (
    <div className="pt-20">
      {/* Page header */}
      <div className="bg-[#1a2b4a] text-white py-20 text-center">
        <p className="text-[#c8a84b] text-sm font-semibold uppercase tracking-widest mb-3">
          FESAPADE
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Quiénes somos
        </h1>
      </div>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-[#1a2b4a] mb-6">
                Nuestra misión
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Promover, regular y desarrollar el paracaidismo y los
                aerodeportes en El Salvador, garantizando los más altos
                estándares de seguridad y formación para todos nuestros
                deportistas.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#1a2b4a] mb-6">
                Nuestra visión
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Ser la federación de referencia en aerodeportes de
                Centroamérica, reconocida por la excelencia en la formación de
                deportistas y la seguridad en cada salto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1a2b4a] text-center mb-12">
            Nuestros valores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {['Seguridad', 'Pasión', 'Excelencia', 'Comunidad'].map((v) => (
              <div
                key={v}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:border-[#c8a84b] transition-colors"
              >
                <div className="text-3xl mb-3">
                  {v === 'Seguridad' ? '🛡️' : v === 'Pasión' ? '❤️' : v === 'Excelencia' ? '⭐' : '🤝'}
                </div>
                <div className="font-bold text-[#1a2b4a]">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#1a2b4a] mb-12">
            Nuestro equipo
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name + member.role} className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-[#1a2b4a] flex items-center justify-center text-white font-bold text-xl">
                  {member.initials}
                </div>
                <div>
                  <div className="font-semibold text-[#1a2b4a]">
                    {member.name}
                  </div>
                  <div className="text-sm text-gray-500">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-gray-400 text-sm">
            * Los nombres y fotos del equipo se actualizan desde el CMS.
          </p>
        </div>
      </section>
    </div>
  );
}
