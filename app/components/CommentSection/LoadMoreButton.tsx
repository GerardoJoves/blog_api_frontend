import { useFetcher } from 'react-router';
import type { ReactNode } from 'react';

import ExpandButton from './ExpandButton';
import Comment from './Comment';
import type { PaginatedComments } from '~/types/Comment';

type LoadMoreButtonProps = {
  children: ReactNode;
  context: { postId: number } | { parentId: number };
  route: string;
  cursor: number;
  sort: 'desc_created' | 'asc_created';
};

export default function LoadMoreButton({
  children,
  context,
  route,
  sort,
  cursor,
}: LoadMoreButtonProps) {
  const { load, data, state } = useFetcher<PaginatedComments>();

  const handleFetching = () => {
    if (state === 'loading') return;

    const params = [
      ['sort', sort],
      ['cursor', String(cursor)],
    ];
    if ('postId' in context) {
      params.push(['postId', String(context.postId)]);
    } else {
      params.push(['parentId', String(context.parentId)]);
    }

    const searchParams = new URLSearchParams(params);
    load(`${route}?${searchParams.toString()}`);
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
  const parentId = 'parentId' in context ? context.parentId : null;
  return (
    <>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          parentId={parentId || comment.id}
        />
      ))}
      {hasMore && nextCursor && (
        <LoadMoreButton
          route={route}
          context={context}
          cursor={nextCursor}
          sort={sort}
        >
          {children}
        </LoadMoreButton>
      )}
    </>
  );
}
