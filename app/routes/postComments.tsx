import * as z from 'zod';
import type { Route } from '../+types/root';

import { fetchPaginatedComments } from '~/api/comment';

const postIdSchema = z
  .string()
  .transform((val) => Number(val))
  .pipe(z.number().int().positive());
const cursorSchema = z
  .string()
  .transform((val) => Number(val))
  .pipe(z.number().int().positive())
  .optional();

export async function loader({ params, request }: Route.ClientActionArgs) {
  const requestUrl = new URL(request.url);
  const searchParams = Object.fromEntries(requestUrl.searchParams);
  const postId = postIdSchema.parse(params.postId);
  const cursor = cursorSchema.parse(searchParams.cursor);
  const paginatedComments = await fetchPaginatedComments({ postId, cursor });
  return paginatedComments;
}
