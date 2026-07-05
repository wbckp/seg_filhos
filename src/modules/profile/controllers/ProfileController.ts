import { FastifyRequest, FastifyReply } from 'fastify';
import { ProfileService } from '../services/ProfileService';
import { updateProfileSchema } from '../validators/profile.validator';

export class ProfileController {
  constructor(private profileService: ProfileService) {}

  async getSession(request: FastifyRequest, reply: FastifyReply) {
    // If the authMiddleware passes, the session is valid
    return reply.send({
      success: true,
      message: 'Session is valid.',
      data: {
        user: request.user,
      },
    });
  }

  async getProfile(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;
    const profile = await this.profileService.getProfile(userId);

    return reply.send({
      success: true,
      message: 'Profile retrieved successfully.',
      data: profile,
    });
  }

  async updateProfile(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;
    const parsedBody = updateProfileSchema.parse(request.body);

    const updated = await this.profileService.updateProfile(userId, parsedBody);

    return reply.send({
      success: true,
      message: 'Profile updated successfully.',
      data: updated,
    });
  }
}
