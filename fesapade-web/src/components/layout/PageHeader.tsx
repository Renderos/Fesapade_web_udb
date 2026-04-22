import Image from 'next/image';

const LOCAL_DEFAULT = '/images/cursos_de_paracaidismo_aff.jpg';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Strapi-resolved absolute URL. When provided, the local fallback is ignored. */
  strapiImageUrl?: string | null;
}

export default function PageHeader({
  eyebrow = 'FESAPADE',
  title,
  subtitle,
  strapiImageUrl,
}: PageHeaderProps) {
  const bgSrc = strapiImageUrl ?? LOCAL_DEFAULT;

  return (
    <div className="relative bg-[#1a2b4a] text-white text-center overflow-hidden">
      <Image
        src={bgSrc}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20 select-none pointer-events-none"
        priority
        unoptimized
      />
      {/* pt accounts for the fixed navbar height (h-16 mobile / h-20 desktop) */}
      <div className="relative z-10 pt-36 md:pt-40 pb-20">
        <p className="text-[#c8a84b] text-sm font-semibold uppercase tracking-widest mb-3">
          {eyebrow}
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-gray-300 max-w-xl mx-auto">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
