import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import { fetchPageHeaderBgs, getStrapiImageUrl } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Historia | FESAPADE',
  description: 'Conoce la historia del paracaidismo en El Salvador y la fundación de FESAPADE.',
};

const timeline = [
  {
    year: '1963',
    title: 'Los orígenes militares',
    description:
      'El paracaidismo en El Salvador tuvo su origen militar en 1963 con la creación de la primera Compañía de Paracaidistas, entrenada en Estados Unidos y bajo el mando inicial del Coronel José Eduardo Iraheta Castellón. Esta unidad, fundamental durante el conflicto armado, pasó de la Fuerza Aérea al Comando de Fuerzas Especiales en 1993, consolidándose como una élite militar.',
  },
  {
    year: '1969',
    title: 'Bautismo de fuego',
    description:
      'Durante la Guerra de las 100 Horas contra Honduras, los paracaidistas realizan misiones estratégicas utilizando aviones C-47, consolidándose como fuerza de élite.',
  },
  {
    year: '1994',
    title: 'Fundación de FESAPADE',
    description:
      'La Federación Salvadoreña de Paracaidismo y Aero Deportes nació un 17 de Marzo de 1994. Su afiliación a INDES El Salvador fue celebrada en el Estadio Jorge "Mágico" González con un salto a 12,000 pies de altura desde un avión AC-47, del cual se lanzaron 41 paracaidistas en una sola pasada.',
  },
  {
    year: 'Hoy',
    title: 'Una federación multidisciplinaria',
    description:
      'La Federación Salvadoreña de Paracaidismo y Aerodeportes (FESAPADE) es una Federación Deportiva Nacional de ámbito estatal y multidisciplinaria que engloba especialidades de los deportes aéreos: Aeromodelísmo, Aerostación, Paracaidísmo, Parapente, Ultraligeros, Vuelo Acrobático, Vuelo a Vela, Vuelo con Motor y Vuelo Libre.',
  },
];

export default async function HistoriaPage() {
  const pageHeaderData = await fetchPageHeaderBgs();
  const bgUrl = pageHeaderData?.data?.historiaBg
    ? getStrapiImageUrl(pageHeaderData.data.historiaBg.url)
    : null;

  return (
    <div>
      <PageHeader title="Nuestra historia" strapiImageUrl={bgUrl} />

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-lg leading-relaxed">
            La historia del paracaidismo en El Salvador es una historia de
            valentía, disciplina y orgullo nacional. Desde sus raíces militares
            en 1963 hasta la consolidación de una federación deportiva
            multidisciplinaria reconocida internacionalmente, cada capítulo ha
            sido escrito con la misma determinación que se necesita para saltar
            al vacío.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-10 pb-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#c8a84b]/30 -translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-10 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-[#c8a84b] -translate-x-1/2 mt-1 z-10" />

                  {/* Content */}
                  <div
                    className={`ml-14 md:ml-0 md:w-1/2 ${
                      i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <span className="inline-block text-xs font-bold text-[#c8a84b] bg-amber-50 px-3 py-1 rounded-full mb-3">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold text-[#1a2b4a] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
