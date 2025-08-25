import * as z from 'zod';
import type { Route } from '../+types/root';

import { createComment, fetchPaginatedComments } from '~/api/comment';
import { data, redirect } from 'react-router';
import { tokenCookie } from '~/cookies.server';

const idSchema = z
  .string()
  .transform((val) => Number(val))
  .pipe(z.number());

const sortSchema = z.union([
  z.literal('asc_created'),
  z.literal('desc_created'),
]);

const postCommentsSearchParamsSchema = z
  .object({
    postId: idSchema,
    cursor: idSchema.optional(),
    sort: sortSchema.optional(),
  })
  .strict();

const commentRepliesSearchParamsSchema = z
  .object({
    parentId: idSchema,
    cursor: idSchema.optional(),
    sort: sortSchema.optional(),
  })
  .strict();

const loaderSearchParamsSchema = z.union([
  postCommentsSearchParamsSchema,
  commentRepliesSearchParamsSchema,
]);

export async function loader({ request }: Route.LoaderArgs) {
  const requestUrl = new URL(request.url);
  const searchParams = Object.fromEntries(requestUrl.searchParams);
  const query = loaderSearchParamsSchema.parse(searchParams);
  const paginatedComments = await fetchPaginatedComments(query);
  return paginatedComments;
}

const commentContentSchema = z.string().trim().min(3).max(500);

const commentSubmissionFormDataSchema = z
  .object({
    postId: idSchema,
    content: commentContentSchema,
  })
  .strict();

const replySubmissionFormDataSchema = z
  .object({
    parentId: idSchema,
    targetUserId: idSchema,
    content: commentContentSchema,
  })
  .strict();

const actionFormDataSchema = z.union([
  commentSubmissionFormDataSchema,
  replySubmissionFormDataSchema,
]);

export async function action({ request }: Route.ActionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const rawToken = await tokenCookie.parse(cookieHeader);
  const tokenValidation = z.jwt().safeParse(rawToken);
  if (tokenValidation.error) return redirect('/login');

  const formData = Object.fromEntries(await request.formData());
  const { error, data: validData } = actionFormDataSchema.safeParse(formData);

  if (error && error.issues.some((i) => i.path[0] === 'content')) {
    return data(
      {
        error: 'Bad Request',
        detail: {
          content: {
            msg: 'Comment must be at least 3 characters long and no more than 500.',
          },
        },
      },
      { status: 400 },
    );
  } else if (error) {
    throw error;
  }

  const res = await createComment({
    ...validData,
    token: tokenValidation.data,
  });
  return res;
}
