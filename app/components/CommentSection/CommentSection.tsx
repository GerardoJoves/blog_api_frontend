import { useEffect } from 'react';
import { useFetcher } from 'react-router';

import type { PaginatedComments } from '~/types/Comment';
import Comment from './Comment';
import LoadMoreButton from './LoadMoreButton';

export default function CommentSection({ postId }: { postId: number }) {
  const { load, data } = useFetcher<PaginatedComments>();
  const path = `/posts/${postId}/comments`;
  const sort = 'desc_created';

  useEffect(() => {
    load(path + (sort ? `?sort=${sort}` : ''));
  }, [postId, load, path]);

  if (!data) return <></>;

  const { comments, hasMore, nextCursor } = data;
  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      {hasMore && nextCursor && (
        <LoadMoreButton path={path} cursor={nextCursor} sort={sort}>
          Show more comments
        </LoadMoreButton>
      )}
    </>
  );
}
