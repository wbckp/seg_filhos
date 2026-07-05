import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from './AppError';
import { ZodError } from 'zod';

export function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      success: false,
      message: error.message,
      errors: [],
    });
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({
      success: false,
      message: 'Validation failed.',
      errors: error.format(),
    });
  }

  // Handle errors from Fastify itself (like bad request format)
  if (error.statusCode) {
    return reply.status(error.statusCode).send({
      success: false,
      message: error.message,
      errors: [],
    });
  }

  console.error(error);

  return reply.status(500).send({
    success: false,
    message: 'Internal server error',
    errors: [],
  });
}
