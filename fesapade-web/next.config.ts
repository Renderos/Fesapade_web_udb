import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Imágenes desde Strapi local en desarrollo
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        // Imágenes desde Strapi en Railway (producción)
        protocol: 'https',
        hostname: '*.up.railway.app',
        pathname: '/uploads/**',
      },
      {
        // Cloudinary (si se configura como media provider de Strapi)
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
