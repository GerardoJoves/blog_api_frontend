import { formatDistance } from 'date-fns';
import { Reply } from 'lucide-react';

import Replies from './Replies';
import type { Comment } from '~/types/Comment';

export default function Comment({ comment }: { comment: Comment }) {
  return (
    <div className="mb-10">
      <div className="flex">
        <div className="pt-1 w-9 sm:w-12 shrink-0 text-gray-500 dark:dark:text-gray-500">
          <img
            src={`https://ui-avatars.com/api/?name=${comment.author.username}&rounded=true&length=1`}
            alt="Profile picture"
            className="h-7 w-7 sm:h-9 sm:w-9"
          />
        </div>
        <div>
          <div className="flex flex-wrap items-baseline">
            <span className="mr-3">{comment.author.username}</span>
            <span className="text-sm min-w-max text-gray-700 dark:dark:text-gray-400">
              {formatDistance(comment.createdAt, new Date())} ago
            </span>
          </div>
          <div className="my-3">
            {comment.targetUser && (
              <span className="text-sky-700 dark:text-sky-500">
                {`@${comment.targetUser.username} `}
              </span>
            )}
            {comment.content}
          </div>
          <div>
            <button type="button" className="flex hover:cursor-pointer">
              <Reply size={15} />
              <span className="ml-1 font-semibold text-sm">Reply</span>
            </button>
          </div>
        </div>
      </div>
      <Replies
        commentId={comment.id}
        repliesCount={comment._count.childComments}
        sort="asc_created"
      />
    </div>
  );
}
