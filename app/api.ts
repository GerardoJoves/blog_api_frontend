import { postSchema, paginatedPostsSchema } from './types/Post';

const API_HOST = import.meta.env.VITE_APP_API_URL;

type FetchPaginatedPostsProps = {
  limit?: number;
  page?: number;
  sort?: 'desc_created' | 'asc_created';
};

export async function fetchPaginatedPosts({
  limit = 9,
  page = 1,
  sort = 'desc_created',
}: FetchPaginatedPostsProps) {
  const url = API_HOST + `/posts?limit=${limit}&sort=${sort}&page=${page}`;
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
