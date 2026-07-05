import { FastifyRequest, FastifyReply } from 'fastify';
import { AppError } from '../../../shared/errors/AppError';
import { env } from '../../../config/env';
import jwt from 'jsonwebtoken';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      throw new AppError('JWT token is missing', 401);
    }

    // Verify token using the Supabase JWT secret
    const decoded = jwt.verify(token, env.SUPABASE_JWT_SECRET) as { sub: string; role?: string };
    
    // Attach user information to request
    request.user = {
      id: decoded.sub,
      role: decoded.role || 'authenticated',
    };
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}
