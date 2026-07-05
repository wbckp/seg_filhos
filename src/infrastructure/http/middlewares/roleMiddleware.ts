import { FastifyRequest, FastifyReply } from 'fastify';
import { AppError } from '../../../shared/errors/AppError';

export function roleMiddleware(allowedRoles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user;

    if (!user) {
      throw new AppError('Unauthorized', 401);
    }

    if (!allowedRoles.includes(user.role)) {
      throw new AppError('Forbidden: insufficient permissions', 403);
    }
  };
}
