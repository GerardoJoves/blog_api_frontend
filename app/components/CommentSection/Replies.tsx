import { useState } from 'react';

import Comment from './Comment';
import ExpandButton from './ExpandButton';
import { useFetcher } from 'react-router';
import LoadMoreButton from './LoadMoreButton';
import type { PaginatedComments } from '~/types/Comment';

type RepliesProps = {
  commentId: number;
  repliesCount: number;
  sort: 'desc_created' | 'asc_created';
};

export default function Replies({
  commentId,
  repliesCount,
  sort,
}: RepliesProps) {
  const [showReplies, setShowReplies] = useState(false);
  const { load, data, state } = useFetcher<PaginatedComments>();
  const path = `/comments/${commentId}/replies`;

  const handleLoadReplies = () => {
    const nextShowReplise = !showReplies;
    setShowReplies(nextShowReplise);
    if (state === 'loading' || nextShowReplise === false) return;
    load(path + (sort ? `?sort=${sort}` : ''));
  };

  if (repliesCount < 1) return <></>;

  return (
    <div className="pl-12 mt-3">
      <ExpandButton onClick={handleLoadReplies} expanded={showReplies}>
        {showReplies ? 'Hide' : 'Show'} {repliesCount} replies
      </ExpandButton>
      {showReplies && data && (
        <div className="pt-3">
          {data.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
          {data.hasMore && data.nextCursor && (
            <LoadMoreButton path={path} cursor={data.nextCursor} sort={sort}>
              Show more replies
            </LoadMoreButton>
          )}
        </div>
      )}
    </div>
  );
}
