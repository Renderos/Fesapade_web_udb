import type { Metadata } from 'next';
import ContactoForm from '@/components/sections/ContactoForm';

export const metadata: Metadata = {
  title: 'Contáctanos | FESAPADE',
  description:
    '¿Tienes preguntas sobre nuestros cursos o fun jumps? Escríbenos y te respondemos lo antes posible.',
};

export default function ContactoPage() {
  return (
    <div className="pt-20">
      <div className="bg-[#1a2b4a] text-white py-20 text-center">
        <p className="text-[#c8a84b] text-sm font-semibold uppercase tracking-widest mb-3">
          FESAPADE
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold">Contáctanos</h1>
        <p className="mt-4 text-gray-300 max-w-xl mx-auto">
          ¿Tienes preguntas sobre nuestros cursos o fun jumps? Escríbenos y te
          respondemos lo antes posible.
        </p>
      </div>

      <ContactoForm />
    </div>
  );
}
