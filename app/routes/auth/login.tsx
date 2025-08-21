import * as z from 'zod';
import { data, Link, useFetcher, redirect } from 'react-router';
import jwt from 'jsonwebtoken';
import type { Route } from './+types/login';

import Logo from '~/components/Logo';
import { loginResponseSchema, userTokenPayloadSchema } from '~/types/User';
import { login } from '~/api/user';
import { tokenCookie } from '~/cookies.server';
import AuthFormSubmitBtn from '~/components/AuthFormSubmitBtn';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  const username = z.string().parse(values.username);
  const password = z.string().parse(values.password);

  const res = loginResponseSchema.parse(await login({ username, password }));
  if ('error' in res) return data(res);

  const { token } = res.data;
  const payload = userTokenPayloadSchema.parse(jwt.decode(token));
  const headers = {
    'Set-Cookie': await tokenCookie.serialize(token, { expires: payload.exp }),
  };
  return redirect('/', { headers });
}

export default function Signup() {
  const fetcher = useFetcher<typeof action>();
  const error = fetcher.data?.error;

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen justify-center px-6 py-8 mx-auto">
        <div className="mb-4">
          <Logo />
        </div>
        <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 border border-neutral-400 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 className="text-lg font-blod leading-tight tracking-tight md:text-xl">
              Sign in to your account
            </h1>
            {error && (
              <em className="mt-1 text-red-700 dark:text-red-500 text-xs">
                Invalid username or password
              </em>
            )}
            <fetcher.Form method="post" className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="username" className="block mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  className="input"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="input"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                />
              </div>
              <AuthFormSubmitBtn>Log in</AuthFormSubmitBtn>
            </fetcher.Form>
            <p className="text-sm font-light text-gray-700 dark:dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="hover:underline text-blue-700">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
