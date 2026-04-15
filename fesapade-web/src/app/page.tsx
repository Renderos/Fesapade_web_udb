import Hero from '@/components/sections/Hero';
import Highlights from '@/components/sections/Highlights';
import CoursesPreview from '@/components/sections/CoursesPreview';
import SocialCTA from '@/components/sections/SocialCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <CoursesPreview />
      <SocialCTA />
    </>
  );
}
