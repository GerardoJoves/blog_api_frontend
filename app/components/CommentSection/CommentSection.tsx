import { useEffect } from 'react';
import { useFetcher } from 'react-router';

import Comment from './Comment';
import LoadMoreButton from './LoadMoreButton';
import CommentForm from './CommentForm';
import type { PaginatedComments } from '~/types/Comment';

export default function CommentSection({ postId }: { postId: number }) {
  const { load, data } = useFetcher<PaginatedComments>();
  const route = `/comments`;
  const sort = 'desc_created';

  useEffect(() => {
    const searchParams = new URLSearchParams([
      ['sort', sort],
      ['postId', String(postId)],
    ]);
    load(`${route}?${searchParams.toString()}`);
  }, [load, route, postId]);

  if (!data) return <></>;

  const { comments, hasMore, nextCursor } = data;
  return (
    <div>
      <CommentForm action={route} postId={postId} />
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} parentId={comment.id} />
      ))}
      {hasMore && nextCursor && (
        <LoadMoreButton
          route={route}
          context={{ postId }}
          cursor={nextCursor}
          sort={sort}
        >
          Show more comments
        </LoadMoreButton>
      )}
    </div>
  );
}
