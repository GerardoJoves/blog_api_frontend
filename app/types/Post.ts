import * as z from 'zod';

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  authorId: z.number(),
  author: z.object({ username: z.string() }),
});

export const paginatedPostsSchema = z.object({
  posts: z.array(postSchema),
  page: z.number(),
  pageSize: z.number(),
  totalPosts: z.number(),
});

export type Post = z.infer<typeof postSchema>;
export type PostsResponse = z.infer<typeof paginatedPostsSchema>;
