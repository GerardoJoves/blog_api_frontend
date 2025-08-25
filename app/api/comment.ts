import { paginatedCommentsSchema } from '../types/Comment';

const API_HOST = import.meta.env.VITE_APP_API_URL;

type FetchPaginatedCommentsProps = {
  postId?: number;
  parentId?: number;
  limit?: number;
  cursor?: number;
  sort?: 'asc_created' | 'desc_created';
};

export async function fetchPaginatedComments({
  limit = 5,
  cursor,
  postId,
  parentId,
  sort,
}: FetchPaginatedCommentsProps) {
  const url = postId
    ? API_HOST + `/posts/${postId}/comments`
    : API_HOST + `/comments/${parentId}/replies`;

  const params = [];
  if (limit) params.push(['limit', String(limit)]);
  if (cursor) params.push(['cursor', String(cursor)]);
  if (sort) params.push(['sort', sort]);

  const searchParams = new URLSearchParams(params);
  const res = await fetch(`${url}?${searchParams.toString()}`);
  const jsonRes = await res.json();
  if (!res.ok) throw new Error('Faild to fetch post comments');
  const paginatedComments = paginatedCommentsSchema.parse(jsonRes);
  return paginatedComments;
}

type CreateCommentProps = {
  postId?: number;
  parentId?: number;
  targetUserId?: number;
  token: string;
  content: string;
};

export async function createComment({
  postId,
  parentId,
  targetUserId,
  token,
  content,
}: CreateCommentProps) {
  const url = API_HOST + '/comments';

  const res = await fetch(url, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postId,
      content,
      parentCommentId: parentId,
      targetUserId,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}
