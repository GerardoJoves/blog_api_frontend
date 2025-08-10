import type { Route } from './+types/posts';

import PostsContainer from '~/components/PostsContainer';
import NavDropdown from '~/components/NavDropdown';
import PaginationControl from '~/components/PaginationControl';
import type { PostsResponse } from '~/types/Post';
import type { Page } from '~/components/PaginationControl';

type SortOption = 'asc_created' | 'desc_created';

export async function loader({ request }: Route.ClientActionArgs) {
  const url = new URL(request.url);
  const sortParam = url.searchParams.get('sort');
  const pageParam = url.searchParams.get('page');

  const sort: SortOption =
    sortParam === 'asc_created' ? 'asc_created' : 'desc_created';
  let page = Number(pageParam);
  if (isNaN(page) || page < 1) page = 1;

  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const res = await fetch(apiUrl + `/posts?limit=9&sort=${sort}&page=${page}`);
  const data: PostsResponse = await res.json();
  return { ...data, sort };
}

export default function posts({ loaderData }: Route.ComponentProps) {
  const { posts, sort, page: currPage, pageSize, totalPosts } = loaderData;

  const sortOptions = [
    {
      name: 'Newest',
      path: '/posts',
      isActive: sort === 'desc_created',
    },
    {
      name: 'Oldest',
      path: '/posts?sort=asc_created',
      isActive: sort === 'asc_created',
    },
  ];

  const totalPages = Math.ceil(totalPosts / pageSize);
  const pages: Page[] = [];
  for (let i = currPage - 2; i <= currPage + 2; i++) {
    if (i < 1 || i > totalPages) continue;
    const page = {
      num: i,
      path: `/posts?${sort === 'asc_created' ? `sort=${sort}&` : ''}page=${i}`,
      isActive: i === currPage,
    };
    pages.push(page);
  }

  return (
    <>
      <title>All Posts</title>

      <div className="px-4 sm:px-10 lg:px-14 my-20">
        <div className="flex justify-between gap-6 flex-wrap mb-10">
          <h1 className="text-2xl font-bold w-max">All Posts</h1>
          <div className="flex gap-2 items-center">
            <span className="w-max">Sort by</span>
            <div className="w-32">
              <NavDropdown options={sortOptions} />
            </div>
          </div>
        </div>
        <PostsContainer posts={posts} />
        {pages.length > 1 && (
          <div className="flex justify-center mt-10">
            <PaginationControl pages={pages} />
          </div>
        )}
      </div>
    </>
  );
}
