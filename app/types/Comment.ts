import * as z from 'zod';

export const commentSchema = z.object({
  id: z.number(),
  content: z.string(),
  likes: z.number(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  targetUser: z.union([
    z.null(),
    z.object({ id: z.number(), username: z.string() }),
  ]),
  author: z.object({ id: z.number(), username: z.string() }),
  _count: z.object({ childComments: z.number() }),
});

export const paginatedCommentsSchema = z.object({
  comments: z.array(commentSchema),
  nextCursor: z.union([z.number(), z.null()]),
  hasMore: z.boolean(),
});

export const createCommentResponseSchema = z.union([
  z.object({ success: z.boolean() }),
  z.object({
    error: z.string(),
    detail: z.object({ content: z.object({ msg: z.string() }) }),
  }),
]);

export type Comment = z.infer<typeof commentSchema>;
export type PaginatedComments = z.infer<typeof paginatedCommentsSchema>;
export type CreateCommentResponse = z.infer<typeof createCommentResponseSchema>;
