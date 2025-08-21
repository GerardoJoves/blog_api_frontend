import { Link } from 'react-router';
import { Menu } from 'lucide-react';
import { useContext, useState } from 'react';

import UserContext from '../UserContext';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden"
      >
        <Menu />
      </button>
      <MenuContent handleCloseMenu={closeMenu} isOpen={isOpen} />
    </>
  );
}

type MenuContentProps = {
  handleCloseMenu: () => void;
  isOpen: boolean;
};

function MenuContent({ handleCloseMenu, isOpen }: MenuContentProps) {
  return (
    isOpen && (
      <div className="fixed z-50 flex flex-col justify-between mt-[79px] pb-[79px] left-0 top-0 w-full h-full bg-white dark:bg-gray-950 md:hidden">
        <nav className="flex flex-col place-content-between">
          <ul>
            <li className="px-4 sm:px-10 border-b border-gray-300 dark:border-gray-800">
              <Link to="/" onClick={handleCloseMenu}>
                <div className="h-16 flex items-center">Home</div>
              </Link>
            </li>
            <li className="px-4 sm:px-10 border-b border-gray-300 dark:border-gray-800">
              <Link to="/posts" onClick={handleCloseMenu}>
                <div className="h-16 flex items-center">Posts</div>
              </Link>
            </li>
          </ul>
        </nav>
        <MenuAuthNav />
      </div>
    )
  );
}

function MenuAuthNav() {
  const user = useContext(UserContext);

  return (
    <nav className="pb-8">
      <ul className="flex flex-col items-stretch sm:items-center gap-4">
        {user ? (
          <li className="px-6">
            <Link to="/logout">
              <div className="h-12 flex items-center justify-center sm:px-30 bg-sky-300 dark:bg-sky-600 rounded-lg">
                Log Out
              </div>
            </Link>
          </li>
        ) : (
          <>
            <li className="px-6">
              <Link to="/login">
                <div className="h-12 flex items-center justify-center sm:px-30">
                  Log In
                </div>
              </Link>
            </li>
            <li className="px-6">
              <Link to="/signup">
                <div className="h-12 flex items-center justify-center sm:px-30 bg-sky-300 dark:bg-sky-600 rounded-lg">
                  Sign Up
                </div>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
