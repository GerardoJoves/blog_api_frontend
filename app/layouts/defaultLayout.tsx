import { Outlet } from 'react-router';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <main className="w-full max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
