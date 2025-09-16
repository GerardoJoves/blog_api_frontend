import { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigation } from 'react-router';
import type { Route } from './+types/defaultLayout';
import jwt from 'jsonwebtoken';
import LoadingBar, { type LoadingBarRef } from 'react-top-loading-bar';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { tokenCookie } from '~/cookies.server';
import UserContext from '~/components/UserContext';
import { userTokenPayloadSchema } from '~/types/User';
import MobileMenu from '~/components/MobileMenu';
import SearchModal from '~/components/SearchModal';
import usePreventBodyScroll from '~/hooks/usePreventBodyScroll';
import useOnBreakpointMatch from '~/hooks/useOnBreakpointMatch';

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
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const loadingBarRef = useRef<LoadingBarRef>(null);
  const navigation = useNavigation();
  const { user } = loaderData;

  const mdBreakpoint = '(width >= 48rem)';
  const handleCloseMenu = useCallback(() => setIsMenuOpen(false), []);
  useOnBreakpointMatch(mdBreakpoint, handleCloseMenu);
  usePreventBodyScroll(isMenuOpen || isSearchModalOpen);

  useEffect(() => {
    if (navigation.state !== 'idle') {
      loadingBarRef.current?.continuousStart();
      setIsMenuOpen(false);
      setIsSearchModalOpen(false);
    } else {
      loadingBarRef.current?.complete();
    }
  }, [navigation.state]);

  return (
    <UserContext value={user}>
      <div className="sticky top-0 z-20">
        <LoadingBar color="#00BFFF" ref={loadingBarRef} shadow={false} />
        <Header
          onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
          onOpenSearchModal={() => setIsSearchModalOpen(true)}
        />
        {isSearchModalOpen && (
          <SearchModal
            isOpen={isSearchModalOpen}
            onClose={() => setIsSearchModalOpen(false)}
          />
        )}
        {isMenuOpen && <MobileMenu />}
      </div>
      <main className="w-full max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </UserContext>
  );
}
