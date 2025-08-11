import { Link } from 'react-router';

import type { Post } from '~/types/Post';
import PostMeta from '../PostMeta/PostMeta';

export default function PostCard({ post }: { post: Post }) {
  const contentPreview = post.content.substring(0, 150) + '...';
  const postPath = `/posts/${post.id}`;

  return (
    <div className="p-4 border rounded-lg border-neutral-400 dark:border-gray-700">
      <Link to={postPath}>
        <img
          className="rounded-lg mb-2"
          src="/default_featured_image.jpg"
          alt="featured image"
        />
      </Link>
      <div className="mb-2">
        <PostMeta post={post} />
      </div>
      <div>
        <Link to={postPath}>
          <h3 className="text-xl font-bold mb-4">{post.title}</h3>
        </Link>
        <p className="text-gray-700 dark:dark:text-gray-400">
          {contentPreview}
        </p>
      </div>
    </div>
  );
}
