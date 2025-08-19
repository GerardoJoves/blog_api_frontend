import { Outlet } from 'react-router';
import type { Route } from './+types/defaultLayout';
import jwt from 'jsonwebtoken';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { tokenCookie } from '~/cookies.server';
import UserContext from '~/components/UserContext';
import { userTokenPayloadSchema, type UserRole } from '~/types/User';

type User = {
  id: number;
  username: string;
  role: UserRole;
  expiresAt: Date;
};

export async function loader({ request }: Route.LoaderArgs) {
  let user: User | undefined;
  const cookieHeader = request.headers.get('Cookie');
  const token = await tokenCookie.parse(cookieHeader);
  const decodedToken = jwt.decode(token);
  const { error, data } = userTokenPayloadSchema.safeParse(decodedToken);
  if (!error) {
    const { sub, username, exp, role } = data;
    user = { id: sub, username, expiresAt: exp, role };
  }
  return { user };
}

export default function DefaultLayout({
  loaderData: { user },
}: Route.ComponentProps) {
  return (
    <>
      <UserContext value={{ user }}>
        <Header />
        <main className="w-full max-w-7xl mx-auto">
          <Outlet />
        </main>
        <Footer />
      </UserContext>
    </>
  );
}
