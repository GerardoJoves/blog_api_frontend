import type { Route } from './+types/posts';

import PostsContainer from '~/components/PostsContainer';
import type { PostsResponse } from '~/types/Post';
import NavDropdown from '~/components/NavDropdown';

export async function loader({ request }: Route.ClientActionArgs) {
  const url = new URL(request.url);
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const sort: 'asc_created' | 'desc_created' =
    url.searchParams.get('sort') === 'oldest' ? 'asc_created' : 'desc_created';
  const res = await fetch(apiUrl + `/posts?sort=${sort}&limit=9`);
  const data: PostsResponse = await res.json();
  return { posts: data.posts, sort };
}

export default function posts({ loaderData }: Route.ComponentProps) {
  const { posts, sort } = loaderData;
  const sortOptions = [
    { name: 'Newest', path: '/posts', isActive: sort === 'desc_created' },
    {
      name: 'Oldest',
      path: '/posts?sort=oldest',
      isActive: sort === 'asc_created',
    },
  ];

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
      </div>
    </>
  );
}
