import { useEffect, useState } from 'react';
import { Outlet, useNavigation } from 'react-router';
import type { Route } from './+types/defaultLayout';
import jwt from 'jsonwebtoken';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { tokenCookie } from '~/cookies.server';
import UserContext from '~/components/UserContext';
import { userTokenPayloadSchema } from '~/types/User';
import MobileMenu from '~/components/MobileMenu';

export async function loader({ request }: Route.LoaderArgs) {
  let user = null;
  const cookieHeader = request.headers.get('Cookie');
  const token = await tokenCookie.parse(cookieHeader);
  const decodedToken = jwt.decode(token);
  const { error, data } = userTokenPayloadSchema.safeParse(decodedToken);
  if (!error) {
    const { sub, username, role } = data;
    user = { id: sub, username, role };
  }
  return { user };
}

export default function DefaultLayout({ loaderData }: Route.ComponentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation();
  const { user } = loaderData;

  useEffect(() => {
    if (navigation.state !== 'idle') setIsMenuOpen(false);
  }, [navigation.state]);

  useEffect(() => {
    const body = document.body;
    if (isMenuOpen) {
      body.classList.add('overflow-y-hidden');
      body.classList.add('md:overflow-y-auto');
    } else {
      body.classList.remove('overflow-y-hidden');
      body.classList.remove('md:overflowy-auto');
    }
  }, [isMenuOpen]);

  return (
    <UserContext value={user}>
      <div className="sticky top-0 z-50">
        <Header onToggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
        {isMenuOpen && <MobileMenu />}
      </div>
      <main className="w-full max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </UserContext>
  );
}
