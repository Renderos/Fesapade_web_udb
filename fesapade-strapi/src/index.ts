import type { Core } from '@strapi/strapi';

// Actions exposed publicly (read-only for all content types)
const PUBLIC_ACTIONS = [
  'api::course.course.find',
  'api::course.course.findOne',
  'api::news-item.news-item.find',
  'api::news-item.news-item.findOne',
  'api::gallery-item.gallery-item.find',
  'api::gallery-item.gallery-item.findOne',
  'api::team-member.team-member.find',
  'api::team-member.team-member.findOne',
  'api::site-config.site-config.find',
];

async function grantPublicAccess(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  const existing = await strapi.db
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: { id: publicRole.id } } });

  const existingActions = new Set((existing as Array<{ action: string }>).map((p) => p.action));

  for (const action of PUBLIC_ACTIONS) {
    if (!existingActions.has(action)) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: { action, role: publicRole.id, enabled: true },
      });
    }
  }
}

async function seedCourses(strapi: Core.Strapi) {
  const count = await strapi.db.query('api::course.course').count();
  if (count > 0) return;

  const now = new Date();
  const courses = [
    {
      titulo: 'Salto Tándem',
      descripcion:
        'Vive la emoción de la caída libre acompañado de un instructor certificado. Vuelas atado al instructor durante todo el salto desde aproximadamente 4,000 metros de altura. No se requiere experiencia previa.',
      precio: 150,
      moneda: 'USD',
      duracion: '~3 horas (incluyendo preparación)',
      nivel: 'principiante',
      destacado: true,
      slug: 'salto-tandem',
      publishedAt: now,
    },
    {
      titulo: 'Curso AFF (Accelerated Freefall)',
      descripcion:
        'El programa oficial para obtener tu licencia de paracaidismo. 8 niveles de formación con instructores certificados por la USPA. Al finalizarlo serás un paracaidista independiente.',
      precio: 1200,
      moneda: 'USD',
      duracion: 'Variable (días/semanas)',
      nivel: 'intermedio',
      destacado: true,
      slug: 'curso-aff',
      publishedAt: now,
    },
    {
      titulo: 'Fun Jump',
      descripcion:
        'Si ya tienes licencia de paracaidismo (A, B, C o D), únete a nuestras jornadas de saltos grupales. El cielo de El Salvador te espera.',
      precio: 40,
      moneda: 'USD',
      duracion: 'Jornada completa',
      nivel: 'avanzado',
      destacado: false,
      slug: 'fun-jump',
      publishedAt: now,
    },
    {
      titulo: 'Canopy Piloting (CP)',
      descripcion:
        'Formación en control de paracaídas en etapas avanzadas. Para paracaidistas con experiencia que quieren perfeccionar su apertura y aterrizaje de precisión.',
      precio: 0,
      moneda: 'USD',
      duracion: 'A definir con instructor',
      nivel: 'avanzado',
      destacado: false,
      slug: 'canopy-piloting',
      publishedAt: now,
    },
  ];

  for (const data of courses) {
    await strapi.db.query('api::course.course').create({ data });
  }
}

async function seedNews(strapi: Core.Strapi) {
  const count = await strapi.db.query('api::news-item.news-item').count();
  if (count > 0) return;

  const now = new Date();
  const articles = [
    {
      titulo: 'Fun Jump – Enero 2025',
      slug: 'fun-jump-enero-2025',
      resumen:
        'Vivimos una jornada increíble con más de 30 saltos realizados. La comunidad FESAPADE sigue creciendo.',
      contenido: `Vivimos una jornada increíble con más de 30 saltos realizados durante nuestro Fun Jump de enero. La comunidad FESAPADE sigue creciendo y cada evento nos demuestra la pasión que compartimos por los aerodeportes.

Contamos con la participación de paracaidistas de diferentes niveles, desde quienes completaron su primer salto autónomo hasta instructores con cientos de saltos. El cielo de El Salvador nos regaló condiciones perfectas.

Agradecemos a todos los participantes y al equipo de FESAPADE por hacer posible este evento. ¡Nos vemos en el próximo!`,
      fecha: '2025-01-15',
      categoria: 'Eventos',
      publishedAt: now,
    },
    {
      titulo: 'Nuevo instructor certificado USPA',
      slug: 'nuevo-instructor-certificado',
      resumen:
        'Nos alegra anunciar que uno de nuestros deportistas ha completado su certificación como instructor AFF.',
      contenido: `Nos alegra anunciar que uno de nuestros deportistas más destacados ha completado con éxito su certificación como instructor AFF (Accelerated Freefall) ante la United States Parachute Association (USPA).

Este logro representa meses de dedicación, formación teórica y práctica intensiva. Con este nuevo instructor certificado, FESAPADE amplía su capacidad para formar paracaidistas en El Salvador bajo los más altos estándares internacionales.

Felicitamos al nuevo instructor y le deseamos muchos éxitos en esta nueva etapa de su carrera.`,
      fecha: '2024-12-03',
      categoria: 'Logros',
      publishedAt: now,
    },
    {
      titulo: 'Participación en Campeonato Centroamericano',
      slug: 'campeonato-centroamericano',
      resumen:
        'El equipo FESAPADE compitió en el Campeonato Centroamericano de Paracaidismo representando a El Salvador.',
      contenido: `El equipo FESAPADE tuvo el honor de representar a El Salvador en el Campeonato Centroamericano de Paracaidismo. Nuestros atletas compitieron en las modalidades de precisión de aterrizaje y formaciones en caída libre.

La experiencia fue enormemente enriquecedora: compartimos con la comunidad regional, aprendimos de los mejores y demostramos el nivel del paracaidismo salvadoreño en el ámbito centroamericano.

Seguimos trabajando para seguir creciendo y representar a El Salvador con orgullo en futuros campeonatos.`,
      fecha: '2024-11-20',
      categoria: 'Competencias',
      publishedAt: now,
    },
  ];

  for (const data of articles) {
    await strapi.db.query('api::news-item.news-item').create({ data });
  }
}

async function seedTeam(strapi: Core.Strapi) {
  const count = await strapi.db.query('api::team-member.team-member').count();
  if (count > 0) return;

  const members = [
    { nombre: 'Carlos Mendoza', cargo: 'Presidente' },
    { nombre: 'Ana López', cargo: 'Directora Técnica' },
    { nombre: 'Ronald Renderos', cargo: 'Instructor Jefe' },
    { nombre: 'María Hernández', cargo: 'Secretaria General' },
  ];

  for (const data of members) {
    await strapi.db.query('api::team-member.team-member').create({ data });
  }
}

async function seedSiteConfig(strapi: Core.Strapi) {
  const existing = await strapi.db.query('api::site-config.site-config').findOne({});
  if (existing) return;

  await strapi.db.query('api::site-config.site-config').create({
    data: {
      telefono: '+503 0000-0000',
      email: 'info@fesapade.org.sv',
      facebook: 'https://facebook.com/fesapade',
      instagram: 'https://instagram.com/fesapade',
      youtube: 'https://youtube.com/@fesapade',
      tiktok: 'https://tiktok.com/@fesapade',
      whatsapp: '+50300000000',
      direccion: 'El Salvador',
    },
  });
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await grantPublicAccess(strapi);
    await seedCourses(strapi);
    await seedNews(strapi);
    await seedTeam(strapi);
    await seedSiteConfig(strapi);
  },
};
