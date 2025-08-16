import { data } from 'react-router';
import type { Route } from './+types/post';
import * as z from 'zod';

import type { Post } from '~/types/Post';
import PostMeta from '~/components/PostMeta/PostMeta';
import { fetchPost } from '~/api/post';
import CommentSection from '~/components/CommentSection';

const postIdParam = z
  .string()
  .transform((val) => Number(val))
  .pipe(z.number().int().positive());

export async function loader({ params }: Route.ClientActionArgs) {
  const { data: postId, success } = postIdParam.safeParse(params.postId);
  if (!success) throw data('Bad Request', { status: 400 });
  const post = await fetchPost({ postId });
  return { post };
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;

  return (
    <>
      <title>{post.title}</title>

      <div className="mt-10 mb-20 px-4">
        <div className="max-w-prose mx-auto leading-relaxed">
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <div className="mb-4">
            <PostMeta post={post} />
          </div>
          <div className="mb-10 rounded-lg overflow-hidden">
            <img src="/default_featured_image.jpg" alt="featured image" />
          </div>
          <div className="mb-10 lg:text-lg">{post.content}</div>
          <h2 className="mb-8 text-xl font-bold">Comments</h2>
          <CommentSection postId={post.id} />
        </div>
      </div>
    </>
  );
}
