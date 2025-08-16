import { paginatedCommentsSchema } from '../types/Comment';

const API_HOST = import.meta.env.VITE_APP_API_URL;

type FetchPaginatedCommentsProps = {
  postId: number;
  limit?: number;
  cursor?: number;
};

export async function fetchPaginatedComments({
  limit = 5,
  cursor,
  postId,
}: FetchPaginatedCommentsProps) {
  const url = API_HOST + `/posts/${postId}/comments`;
  const searchParams = `?limit=${limit}${cursor ? '&cursor=' + cursor : ''}`;
  const res = await fetch(url + searchParams);
  const jsonRes = await res.json();
  if (!res.ok) throw new Error('Faild to fetch post comments');
  const paginatedComments = paginatedCommentsSchema.parse(jsonRes);
  return paginatedComments;
}

type FetchPaginatedReplies = {
  commentId: number;
  limit?: number;
  cursor?: number;
  sort?: 'asc_created' | 'desc_created';
};

export async function fetchPaginatedReplies({
  commentId,
  limit = 5,
  cursor,
  sort,
}: FetchPaginatedReplies) {
  const url = API_HOST + `/comments/${commentId}/replies`;
  const searchParams = `?limit=${limit}${cursor ? '&cursor=' + cursor : ''}${sort ? '&sort=' + sort : ''}`;
  const res = await fetch(url + searchParams);
  const jsonRes = await res.json();
  if (!res.ok) throw new Error('Faild to fetch comment replies');
  const paginatedReplies = paginatedCommentsSchema.parse(jsonRes);
  return paginatedReplies;
}
