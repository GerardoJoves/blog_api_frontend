import { useLoaderData } from 'react-router';

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
        <h1 className="text-2xl font-bold mt-12 mb-8">Recent Posts</h1>
        <PostsContainer posts={latestPosts} />
      </main>
    </>
  );
}
