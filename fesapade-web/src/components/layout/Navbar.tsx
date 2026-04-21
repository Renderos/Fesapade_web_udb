'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/quienes-somos', label: 'Quiénes somos' },
  { href: '/historia', label: 'Historia' },
  { href: '/cursos', label: 'Cursos & Fun Jumps' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/contacto', label: 'Contáctanos' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent lg:bg-[#1a2b4a]'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="FESAPADE"
            width={48}
            height={48}
            className="h-10 w-auto object-contain"
          />
          <span
            className={`font-bold text-lg tracking-wide hidden sm:block transition-colors ${
              scrolled ? 'text-[#1a2b4a]' : 'text-white'
            }`}
          >
            FESAPADE
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#c8a84b] ${
                  scrolled ? 'text-[#1a2b4a]' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          href="/cursos"
          className="hidden lg:inline-flex items-center px-4 py-2 rounded-full bg-[#c8a84b] text-white text-sm font-semibold hover:bg-[#b8953d] transition-colors"
        >
          Reservar ahora
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden p-2 rounded-md transition-colors ${
            scrolled ? 'text-[#1a2b4a]' : 'text-white'
          }`}
          aria-label="Abrir menú"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-xl border-t border-gray-100">
          <ul className="flex flex-col px-4 py-4 gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 px-3 text-[#1a2b4a] font-medium rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="/cursos"
                className="block text-center py-3 rounded-full bg-[#c8a84b] text-white font-semibold hover:bg-[#b8953d] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Reservar ahora
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
