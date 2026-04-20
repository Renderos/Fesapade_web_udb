import { fetchStrapiSafe } from '@/lib/strapi';
import type { StrapiResponse, SiteConfig } from '@/types/strapi';
import { FacebookIcon, InstagramIcon, YoutubeIcon, TiktokIcon } from '@/components/ui/SocialIcons';

export default async function SocialCTA() {
  const data = await fetchStrapiSafe<StrapiResponse<SiteConfig>>('site-config');
  const config = data?.data;

  const socials = [
    {
      name: 'Facebook',
      handle: '@FESAPADE',
      Icon: FacebookIcon,
      href: config?.facebook ?? '#',
    },
    {
      name: 'Instagram',
      handle: '@fesapade',
      Icon: InstagramIcon,
      href: config?.instagram ?? '#',
    },
    {
      name: 'YouTube',
      handle: 'FESAPADE',
      Icon: YoutubeIcon,
      href: config?.youtube ?? '#',
    },
    {
      name: 'TikTok',
      handle: '@fesapade',
      Icon: TiktokIcon,
      href: config?.tiktok ?? '#',
    },
  ];

  return (
    <section className="py-20 bg-[#1a2b4a] text-white text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Síguenos en redes sociales
        </h2>
        <p className="text-gray-300 text-lg mb-10">
          Mira los mejores momentos, novedades y próximas fechas de fun jumps.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          {socials.map(({ name, handle, Icon, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 hover:text-[#c8a84b] transition-all group"
            >
              <Icon
                size={24}
                className="text-white group-hover:text-[#c8a84b] group-hover:scale-110 transition-all"
              />
              <div className="text-left">
                <div className="font-bold text-sm">{name}</div>
                <div className="text-gray-300 text-xs">{handle}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
