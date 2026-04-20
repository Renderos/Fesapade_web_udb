import Link from 'next/link';
import Image from 'next/image';
import { fetchStrapiSafe } from '@/lib/strapi';
import type { StrapiResponse, SiteConfig } from '@/types/strapi';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '@/components/ui/SocialIcons';

const navLinks = [
  { href: '/quienes-somos', label: 'Quiénes somos' },
  { href: '/historia', label: 'Historia' },
  { href: '/cursos', label: 'Cursos & Fun Jumps' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/contacto', label: 'Contáctanos' },
];

export default async function Footer() {
  const data = await fetchStrapiSafe<StrapiResponse<SiteConfig>>('site-config');
  const config = data?.data;

  const email = config?.email ?? 'info@fesapade.org.sv';
  const telefono = config?.telefono ?? '+503 0000-0000';
  const direccion = config?.direccion ?? 'El Salvador';
  const facebook = config?.facebook ?? '#';
  const instagram = config?.instagram ?? '#';
  const youtube = config?.youtube ?? '#';

  return (
    <footer className="bg-[#1a2b4a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="FESAPADE"
                width={48}
                height={48}
                className="h-10 w-auto object-contain brightness-200"
              />
              <span className="font-bold text-xl tracking-wide">FESAPADE</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Federación Salvadoreña de Paracaidismo y Aerodeportes. Promovemos
              los deportes de aviación con seguridad y pasión desde El Salvador.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-[#c8a84b] mb-4 uppercase text-sm tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 text-sm hover:text-[#c8a84b] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-[#c8a84b] mb-4 uppercase text-sm tracking-wider">
              Contáctanos
            </h4>
            <ul className="space-y-2 text-gray-300 text-sm mb-6">
              <li>📧 {email}</li>
              <li>📞 {telefono}</li>
              <li>📍 {direccion}</li>
            </ul>
            <div className="flex gap-4">
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-[#c8a84b] transition-colors"
              >
                <FacebookIcon size={20} />
              </a>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-[#c8a84b] transition-colors"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href={youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-gray-400 hover:text-[#c8a84b] transition-colors"
              >
                <YoutubeIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} FESAPADE. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
