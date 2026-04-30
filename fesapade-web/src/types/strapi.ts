// Tipos base de Strapi
export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Tipos de contenido
export interface Course {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  moneda: string;
  duracion: string;
  nivel: 'principiante' | 'intermedio' | 'avanzado';
  imagen: StrapiImage;
  destacado: boolean;
  slug: string;
}

export interface NewsItem {
  id: number;
  titulo: string;
  resumen: string;
  contenido: string;
  fecha: string;
  imagen: StrapiImage;
  slug: string;
  categoria?: string;
}

export interface TeamMember {
  id: number;
  nombre: string;
  cargo: string;
  foto?: StrapiImage;
}

export interface GalleryItem {
  id: number;
  titulo: string;
  imagen: StrapiImage;
  categoria: 'foto' | 'video';
}

export interface PageHeader {
  id: number;
  quienesSomosBg?: StrapiImage | null;
  historiaBg?: StrapiImage | null;
  cursosBg?: StrapiImage | null;
  noticiasBg?: StrapiImage | null;
  contactoBg?: StrapiImage | null;
}

export interface HighlightFeature {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  orden: number;
  imagenFondo?: StrapiImage | null;
}

export interface SiteConfig {
  id: number;
  telefono: string;
  email: string;
  facebook: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  whatsapp: string;
  direccion: string;
}

export interface HeroConfig {
  id: number;
  Video_URL: string | null;
  Video_File: StrapiImage[] | null;
  Priority: 'Video URL ' | 'Video File ' | null;
}
