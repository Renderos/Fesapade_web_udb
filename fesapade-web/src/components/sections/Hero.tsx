import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { HeroConfig } from '@/types/strapi';
import { getStrapiImageUrl } from '@/lib/strapi';

const DEFAULT_VIDEO_SRC =
  'https://www.youtube.com/embed/j54R3P76aS4?si=gWNh06KE5Qqqfdix&controls=0&autoplay=1&mute=1&loop=1&playlist=j54R3P76aS4&playsinline=1&disablekb=1&modestbranding=1';

function isYouTubeUrl(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be');
}

function toYouTubeEmbedUrl(url: string): string {
  if (url.includes('youtube.com/embed/')) return url;

  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) {
    const id = shortMatch[1];
    return `https://www.youtube.com/embed/${id}?controls=0&autoplay=1&mute=1&loop=1&playlist=${id}&playsinline=1&disablekb=1&modestbranding=1`;
  }

  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) {
    const id = watchMatch[1];
    return `https://www.youtube.com/embed/${id}?controls=0&autoplay=1&mute=1&loop=1&playlist=${id}&playsinline=1&disablekb=1&modestbranding=1`;
  }

  return url;
}

function resolveVideo(config: HeroConfig): { type: 'iframe' | 'video'; src: string } | null {
  const hasUrl = !!config.Video_URL;
  const hasFile = !!(config.Video_File && config.Video_File.length > 0);

  if (!hasUrl && !hasFile) return null;

  const useFile = config.Priority?.trim() === 'Video File';

  if (!useFile && hasUrl) {
    const url = config.Video_URL!;
    return isYouTubeUrl(url)
      ? { type: 'iframe', src: toYouTubeEmbedUrl(url) }
      : { type: 'video', src: url };
  }

  if (hasFile) {
    return { type: 'video', src: getStrapiImageUrl(config.Video_File![0].url) };
  }

  // Priority apunta a file pero no hay archivo — cae al url disponible
  const url = config.Video_URL!;
  return isYouTubeUrl(url)
    ? { type: 'iframe', src: toYouTubeEmbedUrl(url) }
    : { type: 'video', src: url };
}

interface HeroProps {
  config?: HeroConfig | null;
}

export default function Hero({ config }: HeroProps) {
  const resolved = config ? resolveVideo(config) : null;
  const video = resolved ?? { type: 'iframe' as const, src: DEFAULT_VIDEO_SRC };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background video with overlay */}
      <div className="absolute inset-0 overflow-hidden">
        {video.type === 'iframe' ? (
          <iframe
            src={video.src}
            title="Hero background"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full pointer-events-none"
          />
        ) : (
          <video
            src={video.src}
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover pointer-events-none"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a2b4a]/70 via-[#1a2b4a]/50 to-[#1a2b4a]/80" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <p className="text-[#c8a84b] font-semibold uppercase tracking-widest text-sm mb-4">
          Federación Salvadoreña de Paracaidismo y Aerodeportes
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          Vuela sin
          <br />
          <span className="text-[#c8a84b]">límites</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          Descubre la emoción del paracaidismo en El Salvador. Cursos
          certificados, fun jumps y una comunidad apasionada te esperan.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/cursos"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#c8a84b] text-white font-bold text-base hover:bg-[#b8953d] transition-all hover:scale-105 shadow-lg"
          >
            Ver cursos y precios
          </Link>
          <Link
            href="/quienes-somos"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white text-white font-bold text-base hover:bg-white/10 transition-all"
          >
            Conócenos
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#highlights"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white animate-bounce transition-colors"
        aria-label="Scroll hacia abajo"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
