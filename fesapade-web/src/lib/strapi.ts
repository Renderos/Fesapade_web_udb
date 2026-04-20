const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function fetchStrapi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 }, // ISR: revalida cada 60 segundos
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Error al obtener datos de Strapi: ${res.statusText}`);
  }

  return res.json();
}

export async function fetchStrapiSafe<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T | null> {
  try {
    return await fetchStrapi<T>(endpoint, options);
  } catch {
    return null;
  }
}

export function getStrapiImageUrl(url: string): string {
  if (!url) return '/images/placeholder.jpg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}
