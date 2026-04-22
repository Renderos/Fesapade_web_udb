import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import { fetchPageHeaderBgs, getStrapiImageUrl } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Historia | FESAPADE',
  description: 'Conoce la historia del paracaidismo en El Salvador y la fundación de FESAPADE.',
};

const timeline = [
  {
    year: '1980s',
    title: 'Los primeros saltos',
    description:
      'Los primeros paracaidistas salvadoreños realizan saltos de manera independiente, marcando el inicio de este deporte en el país.',
  },
  {
    year: '1990s',
    title: 'Organización de la comunidad',
    description:
      'Se forman los primeros grupos organizados de paracaidistas, estableciendo las bases de lo que sería la federación.',
  },
  {
    year: '2000s',
    title: 'Fundación de FESAPADE',
    description:
      'Se constituye formalmente la Federación Salvadoreña de Paracaidismo y Aerodeportes, afiliándose a organismos internacionales.',
  },
  {
    year: 'Hoy',
    title: 'Crecimiento y excelencia',
    description:
      'FESAPADE cuenta con instructores certificados, programas de formación completos y una comunidad activa de deportistas.',
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
            pasión, valentía y comunidad. Desde los primeros saltos pioneros
            hasta la consolidación de una federación reconocida
            internacionalmente, el camino ha sido tan emocionante como un salto
            en caída libre.
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
