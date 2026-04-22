'use client';

import { useState, useMemo, useRef, forwardRef, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

interface Props {
  email?: string;
  telefono?: string;
}

export default function ContactoForm({ email, telefono }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [phoneValue, setPhoneValue] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const phoneCountryRef = useRef<string>('SV');

  // Custom input that blocks a 9th digit for El Salvador (country code +503 = 3 digits).
  const LimitedPhoneInput = useMemo(
    () =>
      forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
        (props, ref) => {
          const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (phoneCountryRef.current === 'SV' && /^\d$/.test(e.key)) {
              const nationalDigits = e.currentTarget.value.replace(/\D/g, '').slice(3);
              if (nationalDigits.length >= 8) e.preventDefault();
            }
            props.onKeyDown?.(e);
          };
          return <input {...props} ref={ref} onKeyDown={handleKeyDown} />;
        }
      ),
    [] // stable — reads country from ref, never needs to recreate
  );
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    interes: '',
    mensaje: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value: string | undefined) => {
    setPhoneValue(value);
    if (phoneError) setPhoneError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const emailResult = z.string().email().safeParse(form.email);
    if (!emailResult.success) {
      setEmailError('Ingresa un correo electrónico válido.');
      return;
    }
    setEmailError('');

    if (phoneValue && !isValidPhoneNumber(phoneValue)) {
      setPhoneError('Ingresa un número de teléfono válido para el país seleccionado.');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // phoneValue is already E.164 (e.g. +50312345678) when valid
        body: JSON.stringify({ ...form, telefono: phoneValue ?? '' }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
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
                    href={`mailto:${email ?? 'info@fesapade.org.sv'}`}
                    className="text-gray-500 hover:text-[#c8a84b] transition-colors"
                  >
                    {email ?? 'info@fesapade.org.sv'}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="text-[#c8a84b] mt-1 flex-shrink-0" size={22} />
                <div>
                  <div className="font-semibold text-[#1a2b4a]">Teléfono / WhatsApp</div>
                  <a
                    href={`tel:${(telefono ?? '+503 0000-0000').replace(/\s/g, '')}`}
                    className="text-gray-500 hover:text-[#c8a84b] transition-colors"
                  >
                    {telefono ?? '+503 0000-0000'}
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

            <div className="mt-10 rounded-2xl overflow-hidden h-56">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.3968753222744!2d-89.11601354440958!3d13.694396440381983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6337b77bf77a81%3A0x7fc3c41a35277192!2sAeropuerto%20Internacional%20de%20Ilopango!5e0!3m2!1ses-419!2ssv!4v1776889833104!5m2!1ses-419!2ssv"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
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
                {status === 'error' && (
                  <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl">
                    Hubo un error al enviar el mensaje. Intenta de nuevo o escríbenos directo al email.
                  </p>
                )}

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
                    <div
                      className={`border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#c8a84b] transition ${
                        phoneError ? 'border-red-400' : 'border-gray-200'
                      }`}
                    >
                      <PhoneInput
                        international
                        defaultCountry="SV"
                        countries={['SV', 'GT', 'HN', 'NI', 'CR', 'PA', 'MX', 'US', 'CO', 'ES']}
                        value={phoneValue}
                        onChange={handlePhoneChange}
                        onCountryChange={(c) => { phoneCountryRef.current = c ?? 'SV'; }}
                        countrySelectProps={{ unicodeFlags: true }}
                        inputComponent={LimitedPhoneInput}
                      />
                    </div>
                    {phoneError && (
                      <p className="mt-1 text-xs text-red-500">{phoneError}</p>
                    )}
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
                    onChange={(e) => {
                      handleChange(e);
                      if (emailError) setEmailError('');
                    }}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c8a84b] transition ${
                      emailError ? 'border-red-400' : 'border-gray-200'
                    }`}
                    placeholder="tu@email.com"
                  />
                  {emailError && (
                    <p className="mt-1 text-xs text-red-500">{emailError}</p>
                  )}
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
  );
}
