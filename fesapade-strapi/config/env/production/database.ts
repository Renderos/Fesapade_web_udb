import type { Core } from '@strapi/strapi';

export default ({ env }: Core.Config.Shared.ConfigParams) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: env('DATABASE_URL'),
      ssl: { rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false) },
    },
    acquireConnectionTimeout: 60_000,
  },
});
