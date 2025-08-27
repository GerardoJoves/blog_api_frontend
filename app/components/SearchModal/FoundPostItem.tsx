import { Link } from 'react-router';

import type { Post } from '~/types/Post';

export default function FoundPostItem({ post }: { post: Post }) {
  const contentPreview = post.content.substring(0, 150) + '...';

  return (
    <div className="not-last:border-b border-gray-300 dark:border-gray-800">
      <Link to={`/posts/${post.id}`} className="hover:cursor-pointer">
        <div className="py-6 pr-6">
          <p className="text-lg font-bold mb-4">{post.title}</p>
          <p className="text-sm text-gray-700 dark:dark:text-gray-400">
            {contentPreview}
          </p>
        </div>
      </Link>
    </div>
  );
}
