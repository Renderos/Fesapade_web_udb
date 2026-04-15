'use client';

import type { Metadata } from 'next';
import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

// Note: metadata export doesn't work in Client Components.
// Move to a server wrapper if needed. For now, keep basic.

export default function ContactoPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    interes: '',
    mensaje: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // TODO: conectar con API route de Next.js o Strapi
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('sent');
  };

  return (
    <div className="pt-20">
      {/* Header */}
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

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-[#1a2b4a] mb-8">
                Información de contacto
              </h2>

              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <Mail className="text-[#c8a84b] mt-1 flex-shrink-0" size={22} />
                  <div>
                    <div className="font-semibold text-[#1a2b4a]">Email</div>
                    <a
                      href="mailto:info@fesapade.org.sv"
                      className="text-gray-500 hover:text-[#c8a84b] transition-colors"
                    >
                      info@fesapade.org.sv
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone className="text-[#c8a84b] mt-1 flex-shrink-0" size={22} />
                  <div>
                    <div className="font-semibold text-[#1a2b4a]">Teléfono / WhatsApp</div>
                    <a
                      href="tel:+50300000000"
                      className="text-gray-500 hover:text-[#c8a84b] transition-colors"
                    >
                      +503 0000-0000
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin className="text-[#c8a84b] mt-1 flex-shrink-0" size={22} />
                  <div>
                    <div className="font-semibold text-[#1a2b4a]">Ubicación</div>
                    <p className="text-gray-500">El Salvador</p>
                  </div>
                </li>
              </ul>

              {/* Map placeholder */}
              <div className="mt-10 rounded-2xl bg-gray-100 h-56 flex items-center justify-center text-gray-400">
                🗺️ Mapa — se integrará con Google Maps
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-[#1a2b4a] mb-8">
                Envíanos un mensaje
              </h2>

              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-[#1a2b4a] mb-2">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-gray-500">
                    Te responderemos a la brevedad posible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        required
                        value={form.nombre}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c8a84b] transition"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c8a84b] transition"
                        placeholder="+503 ..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c8a84b] transition"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Me interesa...
                    </label>
                    <select
                      name="interes"
                      value={form.interes}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c8a84b] transition bg-white"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="tandem">Salto Tándem</option>
                      <option value="aff">Curso AFF</option>
                      <option value="funjump">Fun Jump</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje *
                    </label>
                    <textarea
                      name="mensaje"
                      required
                      rows={4}
                      value={form.mensaje}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c8a84b] transition resize-none"
                      placeholder="Cuéntanos en qué podemos ayudarte..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#1a2b4a] text-white font-semibold hover:bg-[#c8a84b] transition-colors disabled:opacity-60"
                  >
                    <Send size={16} />
                    {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
