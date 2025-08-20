import { useState } from 'react';
import * as z from 'zod';
import serverCookie from 'cookie';
import clientCookie from 'js-cookie';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  data,
  useLoaderData,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import ThemeContext from './components/ThemeContext';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap',
  },
];

const themeSchema = z.union([z.literal('light'), z.literal('dark')]);
type ThemeType = z.infer<typeof themeSchema>;

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('Cookie') ?? '';
  const cookies = serverCookie.parse(cookieHeader);
  const theme = themeSchema.safeParse(cookies.theme);
  if (theme.error) {
    const cookie = serverCookie.serialize('theme', 'light', {
      maxAge: 31_536_000, // 1 year
      httpOnly: false,
    });
    return data<{ theme: ThemeType }>(
      { theme: 'light' },
      { headers: { 'Set-Cookie': cookie } },
    );
  }
  return data<{ theme: ThemeType }>({ theme: theme.data });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useLoaderData<typeof loader>();
  const [theme, setTheme] = useState<ThemeType>(loaderData.theme);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    clientCookie.set('theme', nextTheme, { expires: 365, path: '/' });
  };

  return (
    <html lang="en" className={theme === 'dark' ? 'dark' : undefined}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <ThemeContext value={{ theme, toggleTheme }}>
        <body className="min-h-dvh grid grid-rows-[auto_1fr_auto]">
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </ThemeContext>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
