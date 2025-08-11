import { data } from 'react-router';
import type { Route } from './+types/post';

import type { Post } from '~/types/Post';
import PostMeta from '~/components/PostMeta/PostMeta';

export async function loader({ params }: Route.ClientActionArgs) {
  const { postId } = params;
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const res = await fetch(apiUrl + `/posts/${postId}`);
  if (!res.ok) throw data(res.status);
  const post: Post = await res.json();
  return { post };
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;

  return (
    <>
      <title>{post.title}</title>

      <div className="mt-10">
        <div className="px-4 sm:px-10 lg:px-14">
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <div className="mb-4">
            <PostMeta post={post} />
          </div>
        </div>
        <div className="mb-10 sm:px-10 lg:px-14">
          <img
            src="/default_featured_image.jpg"
            alt="featured image"
            className="object-cover max-h-[80vh] w-full sm:rounded-lg"
          />
        </div>
        <div className="mb-20 px-4 sm:px-10 lg:px-14">
          <div className="max-w-prose mx-auto lg:text-lg leading-relaxed">
            {post.content}
          </div>
        </div>
      </div>
    </>
  );
}
