import { postSchema, paginatedPostsSchema } from '../types/Post';

const API_HOST = import.meta.env.VITE_APP_API_URL;

type FetchPaginatedPostsProps = {
  limit?: number;
  page?: number;
  sort?: 'desc_created' | 'asc_created';
  q?: string;
};

export async function fetchPaginatedPosts({
  limit = 9,
  page,
  sort,
  q,
}: FetchPaginatedPostsProps) {
  const params = [['limit', String(limit)]];
  if (page) params.push(['page', String(page)]);
  if (sort) params.push(['sort', sort]);
  if (q) params.push(['keyword', q]);
  const searchParams = new URLSearchParams(params);
  const url = `${API_HOST}/posts?${searchParams}`;
  const res = await fetch(url);
  const jsonRes = await res.json();
  if (!res.ok) throw new Error('Failed to fetch posts');
  const paginatedPosts = paginatedPostsSchema.parse(jsonRes);
  return paginatedPosts;
}

export async function fetchPost({ postId }: { postId: number }) {
  const url = API_HOST + `/posts/${postId}`;
  const res = await fetch(url);
  const jsonRes = await res.json();
  if (!res.ok) throw new Error('Failed to fetch post');
  const post = postSchema.parse(jsonRes);
  return post;
}
