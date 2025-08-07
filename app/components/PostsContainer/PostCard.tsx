import { format } from 'date-fns';
import { Clock4, User } from 'lucide-react';
import { Link } from 'react-router';

import type { Post } from '~/types/Post';

export default function PostCard({ post }: { post: Post }) {
  const trimmedContent = post.content.substring(0, 150) + '...';
  const dateCreated = new Date(post.createdAt);

  return (
    <div className="p-4 border rounded-lg border-neutral-400 dark:border-gray-700">
      <Link to={`/post/${post.id}`}>
        <img
          className="rounded-lg mb-2"
          src="/default_featured_image.jpg"
          alt="featured image"
        />
      </Link>
      <div className="flex gap-2 mb-2 text-gray-700 dark:dark:text-gray-400">
        <div className="flex grow items-center gap-1">
          <Clock4 size={15} />
          <time dateTime={String(dateCreated)}>
            {format(dateCreated, 'MM-dd-yyy')}
          </time>
        </div>
        <div className="flex grow items-center gap-1">
          <User size={15} />
          <span>{post.author.username}</span>
        </div>
      </div>
      <div>
        <Link to={`/post/${post.id}`}>
          <h3 className="text-xl font-bold mb-4">{post.title}</h3>
        </Link>
        <p className="text-gray-700 dark:dark:text-gray-400">
          {trimmedContent}
        </p>
      </div>
    </div>
  );
}
