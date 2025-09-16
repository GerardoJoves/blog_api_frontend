import { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useFetcher } from 'react-router';

import Comment from './Comment';
import LoadMoreButton from './LoadMoreButton';
import CommentForm from './CommentForm';
import Dropdown from '../Dropdown';
import type { PaginatedComments } from '~/types/Comment';

type sortOrder = 'desc_created' | 'asc_created';

export default function CommentSection({ postId }: { postId: number }) {
  const { load, data, state } = useFetcher<PaginatedComments>();
  const [sort, setSort] = useState<sortOrder>('desc_created');
  const route = `/comments`;

  const sortOptions = [
    {
      name: 'Newest',
      isActive: sort === 'desc_created',
      el: (
        <div
          onClick={() => setSort('desc_created')}
          className="hover:cursor-pointer"
        >
          Newest
        </div>
      ),
    },
    {
      name: 'Oldest',
      isActive: sort === 'asc_created',
      el: (
        <div
          onClick={() => setSort('asc_created')}
          className="hover:cursor-pointer"
        >
          Oldest
        </div>
      ),
    },
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams([
      ['sort', sort],
      ['postId', String(postId)],
    ]);
    load(`${route}?${searchParams.toString()}`);
  }, [load, route, sort, postId]);

  return (
    <div>
      <div className="flex mb-10 justify-between items-center flex-wrap gap-6">
        <h2 className="text-xl font-bold">Comments</h2>
        <div className="flex gap-2 items-center">
          <span className="w-max">Sort by</span>
          <div className="w-32">
            <Dropdown
              trigger={
                sortOptions.find((op) => op.isActive === true)?.name ?? ''
              }
              options={sortOptions}
            />
          </div>
        </div>
      </div>
      <CommentForm action={route} postId={postId} />
      {!data || state === 'loading' ? (
        <div className="py-4">
          <LoaderCircle size={20} className="spin mx-auto" />
        </div>
      ) : (
        <div>
          {data.comments.length === 0 && (
            <p className="text-center text-gray-700 dark:dark:text-gray-400">
              This space is empty! Leave a comment to start the conversation.
            </p>
          )}
          {data.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} parentId={comment.id} />
          ))}
          {data.hasMore && data.nextCursor && (
            <LoadMoreButton
              route={route}
              context={{ postId }}
              cursor={data.nextCursor}
              sort={sort}
            >
              Show more comments
            </LoadMoreButton>
          )}
        </div>
      )}
    </div>
  );
}
