import { Clock4, User } from 'lucide-react';
import { format } from 'date-fns';

import type { Post } from '~/types/Post';

export default function PostMeta({ post }: { post: Post }) {
  const dateCreated = new Date(post.createdAt);

  return (
    <div className="flex flex-wrap text-gray-700 dark:dark:text-gray-400">
      <div className="flex items-center gap-1 mr-4">
        <Clock4 size={15} />
        <time dateTime={String(dateCreated)}>
          {format(dateCreated, 'MM-dd-yyy')}
        </time>
      </div>
      <div className="flex items-center gap-1">
        <User size={15} />
        <span>{post.author.username}</span>
      </div>
    </div>
  );
}
