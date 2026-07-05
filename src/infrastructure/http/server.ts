import { app } from './app';
import { env } from '../../config/env';
import { prisma } from '../database/prisma';

async function start() {
  try {
    // Connect to database
    await prisma.$connect();
    app.log.info('Database connected successfully');

    // Start server
    await app.listen({ port: env.PORT, host: '0.0.0.0' });
    app.log.info(`Server listening on http://localhost:${env.PORT}`);
    app.log.info(`Swagger documentation available at http://localhost:${env.PORT}/docs`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
