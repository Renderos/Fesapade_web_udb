import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FESAPADE | Federación Salvadoreña de Paracaidismo y Aerodeportes',
  description:
    'Vive la experiencia del paracaidismo en El Salvador. Cursos, fun jumps y más con FESAPADE.',
  openGraph: {
    title: 'FESAPADE',
    description: 'Paracaidismo y aerodeportes en El Salvador.',
    siteName: 'FESAPADE',
    locale: 'es_SV',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
