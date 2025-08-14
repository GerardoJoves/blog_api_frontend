import * as z from 'zod';
import type { Route } from './+types/posts';
import { data } from 'react-router';

import PostsContainer from '~/components/PostsContainer';
import NavDropdown from '~/components/NavDropdown';
import PaginationControl from '~/components/PaginationControl';
import type { Page } from '~/components/PaginationControl';
import { fetchPaginatedPosts } from '~/api/post';

const searchParamsSchema = z.object({
  limit: z
    .string()
    .transform((val) => Number(val))
    .pipe(z.number().int().positive())
    .optional(),
  page: z
    .string()
    .transform((val) => Number(val))
    .pipe(z.number().int().positive())
    .optional(),
  sort: z.enum(['desc_created', 'asc_created']).default('desc_created'),
});

export async function loader({ request }: Route.ClientActionArgs) {
  const url = new URL(request.url);
  const rawParams = Object.fromEntries(url.searchParams);
  const result = searchParamsSchema.safeParse(rawParams);
  if (!result.success) throw data('Bad Request', { status: 400 });
  const params = result.data;
  const paginatedPosts = await fetchPaginatedPosts(params);
  return { ...paginatedPosts, sort: params.sort };
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
