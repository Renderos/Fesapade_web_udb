import Hero from '@/components/sections/Hero';
import Highlights from '@/components/sections/Highlights';
import CoursesPreview from '@/components/sections/CoursesPreview';
import SocialCTA from '@/components/sections/SocialCTA';
import { fetchHeroConfig } from '@/lib/strapi';

export default async function HomePage() {
  const heroConfigRes = await fetchHeroConfig();
  const heroConfig = heroConfigRes?.data ?? null;

  return (
    <>
      <Hero config={heroConfig} />
      <Highlights />
      <CoursesPreview />
      <SocialCTA />
    </>
  );
}
