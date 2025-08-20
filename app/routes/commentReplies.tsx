import * as z from 'zod';
import type { Route } from '../+types/root';

import { fetchPaginatedReplies } from '~/api/comment';

const commentIdSchema = z
  .string()
  .transform((val) => Number(val))
  .pipe(z.number().int().positive());
const cursorSchema = z
  .string()
  .transform((val) => Number(val))
  .pipe(z.number().int().positive())
  .optional();
const sortSchema = z
  .union([z.literal('asc_created'), z.literal('desc_created')])
  .optional();

export async function loader({ params, request }: Route.LoaderArgs) {
  const requestUrl = new URL(request.url);
  const searchParams = Object.fromEntries(requestUrl.searchParams);
  const commentId = commentIdSchema.parse(params.commentId);
  const cursor = cursorSchema.parse(searchParams.cursor);
  const sort = sortSchema.parse(searchParams.sort);
  const paginatedComments = await fetchPaginatedReplies({
    commentId,
    cursor,
    sort,
  });
  return paginatedComments;
}
