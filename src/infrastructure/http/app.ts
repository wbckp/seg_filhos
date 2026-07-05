import fastify from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import compress from '@fastify/compress';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { errorHandler } from '../../shared/errors/errorHandler';

export const app = fastify({
  logger: process.env.NODE_ENV === 'development',
});

// Register Plugins
app.register(helmet);
app.register(cors, {
  origin: '*', // Customize this for production
});
app.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
});
app.register(compress);

// Register Swagger
app.register(swagger, {
  openapi: {
    info: {
      title: 'Parental Control API',
      description: 'API documentation for the Parental Control Backend',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
});

app.register(swaggerUi, {
  routePrefix: '/docs',
});

import { profileRoutes } from '../../modules/profile/routes/profile.routes';
import { childrenRoutes } from '../../modules/children/routes/children.routes';

// Global Error Handler
app.setErrorHandler(errorHandler);

// Routes Registration
app.register(profileRoutes);
app.register(childrenRoutes);

app.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});
