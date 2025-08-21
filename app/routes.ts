import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  layout('layouts/defaultLayout.tsx', [
    index('routes/home.tsx'),
    ...prefix('/posts', [
      index('routes/posts.tsx'),
      route('/:postId', 'routes/post.tsx'),
      route('/:postId/comments', 'routes/postComments.tsx'),
    ]),
    route('/comments/:commentId/replies', 'routes/commentReplies.tsx'),
  ]),
  route('/signup', 'routes/auth/signup.tsx'),
  route('/login', 'routes/auth/login.tsx'),
] satisfies RouteConfig;
