import type { Metadata } from 'next';
import ContactoForm from '@/components/sections/ContactoForm';
import PageHeader from '@/components/layout/PageHeader';
import { fetchPageHeaderBgs, fetchStrapiSafe, getStrapiImageUrl } from '@/lib/strapi';
import type { StrapiResponse, SiteConfig } from '@/types/strapi';

export const metadata: Metadata = {
  title: 'Contáctanos | FESAPADE',
  description:
    '¿Tienes preguntas sobre nuestros cursos o fun jumps? Escríbenos y te respondemos lo antes posible.',
};

export default async function ContactoPage() {
  const [pageHeaderData, siteConfigData] = await Promise.all([
    fetchPageHeaderBgs(),
    fetchStrapiSafe<StrapiResponse<SiteConfig>>('site-config'),
  ]);

  const bgUrl = pageHeaderData?.data?.contactoBg
    ? getStrapiImageUrl(pageHeaderData.data.contactoBg.url)
    : null;

  const config = siteConfigData?.data;

  return (
    <div>
      <PageHeader
        title="Contáctanos"
        subtitle="¿Tienes preguntas sobre nuestros cursos o fun jumps? Escríbenos y te respondemos lo antes posible."
        strapiImageUrl={bgUrl}
      />

      <ContactoForm
        email={config?.email}
        telefono={config?.telefono}
      />
    </div>
  );
}
