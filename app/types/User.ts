import * as z from 'zod';

export type UserRole = 'ADMIN' | 'USER';

export const userTokenPayloadSchema = z.object({
  sub: z.number(),
  username: z.string(),
  role: z.union([z.literal('ADMIN'), z.literal('USER')]),
  iat: z.number().transform((val) => new Date(val)),
  exp: z.number().transform((val) => new Date(val)),
});

export type UserTokenPayload = z.infer<typeof userTokenPayloadSchema>;
