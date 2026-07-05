import { FastifyInstance } from 'fastify';
import { ProfileController } from '../controllers/ProfileController';
import { ProfileService } from '../services/ProfileService';
import { ProfileRepository } from '../repositories/ProfileRepository';
import { authMiddleware } from '../../../infrastructure/http/middlewares/authMiddleware';

export async function profileRoutes(app: FastifyInstance) {
  // Dependency Injection setup (Manual Factory)
  const profileRepository = new ProfileRepository();
  const profileService = new ProfileService(profileRepository);
  const profileController = new ProfileController(profileService);

  // Apply auth middleware to all profile routes
  app.addHook('onRequest', authMiddleware);

  app.get('/auth/session', profileController.getSession.bind(profileController));
  app.get('/profile', profileController.getProfile.bind(profileController));
  app.put('/profile', profileController.updateProfile.bind(profileController));
}
