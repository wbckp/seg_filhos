import { z } from 'zod';

export const createChildSchema = z.object({
  name: z.string().min(2),
  birthDate: z.coerce.date(),
  photoUrl: z.string().url().optional(),
});

export const updateChildSchema = z.object({
  name: z.string().min(2).optional(),
  birthDate: z.coerce.date().optional(),
  photoUrl: z.string().url().optional(),
});

export const childIdParamSchema = z.object({
  id: z.string().uuid(),
});
