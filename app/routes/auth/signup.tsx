import * as z from 'zod';
import { Link, useFetcher, data, redirect } from 'react-router';
import jwt from 'jsonwebtoken';
import type { Route } from '../+types/signup';

import Logo from '~/components/Logo';
import { createUser } from '~/api/user';
import { tokenCookie } from '~/cookies.server';
import { signupResponseSchema, userTokenPayloadSchema } from '~/types/User';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  const username = z.string().parse(values.username);
  const password = z.string().parse(values.password);
  const confirmPassword = z.string().parse(values['confirm-password']);

  if (password !== confirmPassword) {
    return data(
      { errors: { confirmPassword: 'Password does not match.' } },
      { status: 400 },
    );
  }

  const res = signupResponseSchema.parse(
    await createUser({ username, password }),
  );
  if ('error' in res) {
    const { username, password } = res.detail;
    return data(
      { errors: { username: username?.msg, password: password?.msg } },
      { status: 400 },
    );
  }

  const { token } = res.data;
  const payload = userTokenPayloadSchema.parse(jwt.decode(token));
  const headers = {
    'Set-Cookie': await tokenCookie.serialize(token, { expires: payload.exp }),
  };
  return redirect('/', { headers });
}

export default function Signup() {
  const fetcher = useFetcher<typeof action>();
  const errors = fetcher.data?.errors;

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen justify-center px-6 py-8 mx-auto">
        <div className="mb-4">
          <Logo />
        </div>
        <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 border border-neutral-400 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 className="text-lg font-blod leading-tight tracking-tight md:text-xl">
              Create an account
            </h1>
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
                {errors && 'username' in errors && (
                  <em className="mt-1 text-red-700 dark:text-red-500 text-xs">
                    {errors.username}
                  </em>
                )}
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
                {errors && 'password' in errors && (
                  <em className="mt-1 text-red-700 dark:text-red-500 text-xs">
                    {errors.password}
                  </em>
                )}
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-2">
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  name="confirm-password"
                  className="input"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                />
                {errors && 'confirmPassword' in errors && (
                  <em className="mt-1 text-red-700 dark:text-red-500 text-xs">
                    {errors.confirmPassword}
                  </em>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 hover:dark:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center"
              >
                Create account
              </button>
              <p className="text-sm font-light text-gray-700 dark:dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="hover:underline text-blue-700">
                  Log in
                </Link>
              </p>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </div>
  );
}
