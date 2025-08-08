import { ChevronRight } from 'lucide-react';
import type { Route } from './+types/home';
import { Link } from 'react-router';

import PostsContainer from '~/components/PostsContainer';
import Hero from '../components/Hero';
import type { PostsResponse } from '~/types/Post';

export async function loader() {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const res = await fetch(baseUrl + '/posts?sort=desc_created&limit=3');
  const data: PostsResponse = await res.json();
  return { latestPosts: data.posts };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { latestPosts } = loaderData;

  return (
    <>
      <title>Blogging</title>

      <div className="mb-20">
        <Hero />
      </div>
      <div className="px-4 sm:px-10 lg:px-14 mb-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Recent Posts</h1>
          <Link to="/posts">
            <div className="flex gap-1 items-center text-sm sm:text-base hover:underline">
              <span>View all posts</span>
              <ChevronRight size={18} />
            </div>
          </Link>
        </div>
        <PostsContainer posts={latestPosts} />
      </div>
    </>
  );
}
