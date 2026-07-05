import { FastifyInstance } from 'fastify';
import { ChildController } from '../controllers/ChildController';
import { ChildService } from '../services/ChildService';
import { ChildRepository } from '../repositories/ChildRepository';
import { authMiddleware } from '../../../infrastructure/http/middlewares/authMiddleware';
import { roleMiddleware } from '../../../infrastructure/http/middlewares/roleMiddleware';

export async function childrenRoutes(app: FastifyInstance) {
  const childRepository = new ChildRepository();
  const childService = new ChildService(childRepository);
  const childController = new ChildController(childService);

  // Apply auth middleware
  app.addHook('onRequest', authMiddleware);
  // Only PARENT and ADMIN can access these routes
  app.addHook('onRequest', roleMiddleware(['PARENT', 'ADMIN']));

  app.get('/children', childController.list.bind(childController));
  app.post('/children', childController.create.bind(childController));
  app.get('/children/:id', childController.get.bind(childController));
  app.put('/children/:id', childController.update.bind(childController));
  app.delete('/children/:id', childController.delete.bind(childController));
}
