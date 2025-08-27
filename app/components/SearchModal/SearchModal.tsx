import { Search, X } from 'lucide-react';
import { useFetcher } from 'react-router';

import useClickOutside from '~/hooks/useClickOutside';
import type { PostsResponse } from '~/types/Post';
import FoundPostItem from './FoundPostItem';

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchModal({ onClose }: SearchModalProps) {
  const fetcher = useFetcher<PostsResponse>();
  const modalRef = useClickOutside<HTMLDivElement>(onClose);

  return (
    <div className="fixed z-20 top-0 left-0 w-dvw h-dvh bg-gray-950/80">
      <div
        ref={modalRef}
        className="flex flex-col max-h-full px-2 sm:px-10 lg:px-14 bg-white dark:bg-gray-950 border-b border-neutral-400 dark:border-gray-700"
      >
        <div className="flex shrink-0 justify-center items-stretch  gap-2 sm:gap-4 h-20">
          <div className="grow grid items-center relative max-w-[600px]">
            <search className="relative z-10">
              <fetcher.Form action="/posts" className="relative">
                <input type="search" name="q" className="input pr-15" />
                <button
                  type="submit"
                  className="hover:cursor-pointer absolute right-0 top-0 h-full px-4"
                >
                  <Search />
                </button>
              </fetcher.Form>
            </search>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="hover:cursor-pointer"
          >
            <X />
          </button>
        </div>
        {fetcher.data && (
          <div className="overflow-y-auto mb-8 w-full max-w-[640px] mx-auto">
            {fetcher.data.posts.length > 0 ? (
              fetcher.data.posts.map((post) => (
                <FoundPostItem key={post.id} post={post} />
              ))
            ) : (
              <div className="pt-4">No results found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
