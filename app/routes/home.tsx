import { useLoaderData, Link } from 'react-router';
import { ChevronRight } from 'lucide-react';

import PostsContainer from '~/components/PostsContainer';
import Hero from '../components/Hero';
import type { Post } from '~/types/Post';

export async function loader() {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const res = await fetch(baseUrl + '/posts?sort=desc_created&limit=3');
  const { posts } = await res.json();
  return { latestPosts: posts };
}

export default function Home() {
  const { latestPosts } = useLoaderData<{ latestPosts: Post[] }>();

  return (
    <>
      <title>Thought Flow</title>
      <Hero />
      <main className="px-4 sm:px-10 lg:px-14">
        <div className="flex justify-between items-center mt-12 mb-8">
          <h1 className="text-2xl font-bold">Recent Posts</h1>
          <Link to="/posts">
            <div className="flex gap-1 items-center text-sm md:text-base hover:underline">
              <span>View all posts</span>
              <ChevronRight size={18} />
            </div>
          </Link>
        </div>
        <PostsContainer posts={latestPosts} />
      </main>
    </>
  );
}
