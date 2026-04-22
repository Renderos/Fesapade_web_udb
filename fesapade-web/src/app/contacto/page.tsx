import type { Metadata } from 'next';
import ContactoForm from '@/components/sections/ContactoForm';
import PageHeader from '@/components/layout/PageHeader';
import { fetchPageHeaderBgs, getStrapiImageUrl } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Contáctanos | FESAPADE',
  description:
    '¿Tienes preguntas sobre nuestros cursos o fun jumps? Escríbenos y te respondemos lo antes posible.',
};

export default async function ContactoPage() {
  const pageHeaderData = await fetchPageHeaderBgs();
  const bgUrl = pageHeaderData?.data?.contactoBg
    ? getStrapiImageUrl(pageHeaderData.data.contactoBg.url)
    : null;

  return (
    <div>
      <PageHeader
        title="Contáctanos"
        subtitle="¿Tienes preguntas sobre nuestros cursos o fun jumps? Escríbenos y te respondemos lo antes posible."
        strapiImageUrl={bgUrl}
      />

      <ContactoForm />
    </div>
  );
}
