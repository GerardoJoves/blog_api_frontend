import { formatDistance } from 'date-fns';
import { useContext, useState } from 'react';

import Replies from './Replies';
import type { Comment } from '~/types/Comment';
import ProfilePicture from './ProfilePicture';
import UserContext from '../UserContext';
import ReplyForm, { ReplyButton } from './ReplyForm';

type CommentProps = { comment: Comment; parentId: number };

export default function Comment({ comment, parentId }: CommentProps) {
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const user = useContext(UserContext);

  const toggleReplyForm = () => {
    setIsReplyFormOpen(!isReplyFormOpen);
  };

  const handleCloseReplyForm = () => {
    setIsReplyFormOpen(false);
  };

  return (
    <div className="flex gap-3 mb-8">
      <ProfilePicture username={comment.author.username} />
      <div className="grow">
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
        <div>{user && <ReplyButton onClick={toggleReplyForm} />}</div>
        {isReplyFormOpen && (
          <ReplyForm
            onClose={handleCloseReplyForm}
            action="/comments"
            parentId={parentId}
            targetUserId={comment.author.id}
          />
        )}
        <Replies
          parentId={parentId}
          repliesCount={comment._count.childComments}
          sort="asc_created"
        />
      </div>
    </div>
  );
}
