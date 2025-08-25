import { useState } from 'react';

import Comment from './Comment';
import ExpandButton from './ExpandButton';
import { useFetcher } from 'react-router';
import LoadMoreButton from './LoadMoreButton';
import type { PaginatedComments } from '~/types/Comment';

type RepliesProps = {
  parentId: number;
  repliesCount: number;
  sort: 'desc_created' | 'asc_created';
};

export default function Replies({
  parentId,
  repliesCount,
  sort,
}: RepliesProps) {
  const [showReplies, setShowReplies] = useState(false);
  const { load, data, state } = useFetcher<PaginatedComments>();
  const route = `/comments`;

  const handleLoadReplies = () => {
    const nextShowReplise = !showReplies;
    setShowReplies(nextShowReplise);
    if (state === 'loading' || nextShowReplise === false) return;
    const searchParams = new URLSearchParams([
      ['parentId', String(parentId)],
      ['sort', sort],
    ]);
    load(`${route}?${searchParams.toString()}`);
  };

  if (repliesCount < 1) return <></>;

  return (
    <div className="mt-3">
      <ExpandButton onClick={handleLoadReplies} expanded={showReplies}>
        {showReplies ? 'Hide' : 'Show'} {repliesCount} replies
      </ExpandButton>
      {showReplies && data && (
        <div className="pt-6">
          {data.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} parentId={parentId} />
          ))}

          {data.hasMore && data.nextCursor && (
            <LoadMoreButton
              route={route}
              context={{ parentId }}
              cursor={data.nextCursor}
              sort={sort}
            >
              Show more replies
            </LoadMoreButton>
          )}
        </div>
      )}
    </div>
  );
}
