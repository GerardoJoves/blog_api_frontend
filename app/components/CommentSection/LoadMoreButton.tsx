import { useFetcher } from 'react-router';
import type { ReactNode } from 'react';

import ExpandButton from './ExpandButton';
import Comment from './Comment';
import type { PaginatedComments } from '~/types/Comment';

type LoadMoreButtonProps = {
  children: ReactNode;
  path: string;
  cursor: number;
  sort: 'desc_created' | 'asc_created';
};

export default function LoadMoreButton({
  children,
  path,
  sort,
  cursor,
}: LoadMoreButtonProps) {
  const { load, data, state } = useFetcher<PaginatedComments>();

  const handleFetching = () => {
    if (state === 'loading') return;
    const searchParams = `?cursor=${cursor}${sort ? `&sort=${sort}` : ''}`;
    load(path + searchParams);
  };

  if (!data) {
    return (
      <>
        {state === 'idle' ? (
          <ExpandButton onClick={handleFetching}>{children}</ExpandButton>
        ) : (
          <span>Loading...</span>
        )}
      </>
    );
  }

  const { comments, hasMore, nextCursor } = data;
  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      {hasMore && nextCursor && (
        <LoadMoreButton path={path} cursor={nextCursor} sort={sort}>
          {children}
        </LoadMoreButton>
      )}
    </>
  );
}
