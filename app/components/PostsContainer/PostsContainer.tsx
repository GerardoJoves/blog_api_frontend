import PostCard from './PostCard';
import type { Post } from '~/types/Post';

export default function PostsContainer({ posts }: { posts: Post[] }) {
  const postCards = posts.map((post) => <PostCard key={post.id} post={post} />);

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{postCards}</div>
  );
}
