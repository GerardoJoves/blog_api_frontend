export interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  author: { username: string };
}

export interface PostsResponse {
  posts: Post[];
  page: number;
  pageSize: number;
  totalPosts: number;
}
