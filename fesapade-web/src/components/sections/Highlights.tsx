import Image from 'next/image';
import { Wind, Users, Award, MapPin } from 'lucide-react';
import { fetchStrapiSafe, getStrapiImageUrl } from '@/lib/strapi';
import type { StrapiResponse, HighlightFeature } from '@/types/strapi';

const stats = [
  { icon: Wind, value: '+1000', label: 'Saltos realizados' },
  { icon: Users, value: '+200', label: 'Deportistas formados' },
  { icon: Award, value: '30+', label: 'Años de experiencia' },
  { icon: MapPin, value: 'SV', label: 'El Salvador' },
];

const staticFeatures = [
  {
    title: 'Cursos certificados',
    description:
      'Programas de formación con instructores certificados internacionalmente. Desde nivel básico hasta avanzado.',
    icon: '🪂',
    imagenFondo: null,
  },
  {
    title: 'Fun Jumps',
    description:
      'Jornadas de saltos recreativos para todos los niveles. Únete a nuestra comunidad y disfruta del cielo salvadoreño.',
    icon: '🌤️',
    imagenFondo: null,
  },
  {
    title: 'Seguridad primero',
    description:
      'Equipos certificados, protocolos estrictos y supervisión constante. Tu seguridad es nuestra prioridad.',
    icon: '🛡️',
    imagenFondo: null,
  },
];

type FeatureItem = {
  title: string;
  description: string;
  icon: string;
  imagenFondo: { url: string; alternativeText: string | null } | null;
};

function FeatureCard({ f }: { f: FeatureItem }) {
  const imgUrl = f.imagenFondo ? getStrapiImageUrl(f.imagenFondo.url) : null;

  if (imgUrl) {
    return (
      <div className="group relative rounded-2xl overflow-hidden min-h-64 hover:shadow-xl transition-all duration-300">
        <Image
          src={imgUrl}
          alt={f.imagenFondo?.alternativeText ?? f.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative z-10 p-8 flex flex-col justify-end h-full">
          <div className="text-4xl mb-3">{f.icon}</div>
          <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
          <p className="text-gray-200 text-sm leading-relaxed">{f.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group p-8 rounded-2xl border border-gray-100 hover:border-[#c8a84b] hover:shadow-lg transition-all duration-300">
      <div className="text-4xl mb-4">{f.icon}</div>
      <h3 className="text-xl font-bold text-[#1a2b4a] mb-3">{f.title}</h3>
      <p className="text-gray-500 leading-relaxed">{f.description}</p>
    </div>
  );
}

export default async function Highlights() {
  const data = await fetchStrapiSafe<StrapiResponse<HighlightFeature[]>>(
    'highlight-features?populate=imagenFondo&sort=orden:asc&status=published'
  );

  const features: FeatureItem[] =
    data?.data?.length
      ? data.data.map((f) => ({
          title: f.titulo,
          description: f.descripcion,
          icon: f.icono,
          imagenFondo: f.imagenFondo ?? null,
        }))
      : staticFeatures;

  return (
    <>
      {/* Stats bar */}
      <section className="bg-[#1a2b4a] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-white">
                <Icon className="mx-auto mb-2 text-[#c8a84b]" size={28} />
                <div className="text-3xl font-extrabold">{value}</div>
                <div className="text-gray-300 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="highlights" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b4a] mb-4">
              ¿Por qué elegir FESAPADE?
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Somos la federación oficial de paracaidismo en El Salvador.
              Formamos deportistas con los más altos estándares internacionales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <FeatureCard key={f.title} f={f} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
