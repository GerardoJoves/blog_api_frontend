import { Link } from 'react-router';
import { useContext } from 'react';

import UserContext from '../UserContext';

export default function MobileMenu() {
  return (
    <div className="fixed flex flex-col justify-between pt-20 left-0 top-0 w-full h-full bg-white dark:bg-gray-950 md:hidden">
      <nav className="flex flex-col place-content-between">
        <ul>
          <li className="px-4 sm:px-10 border-b border-gray-300 dark:border-gray-800">
            <Link to="/">
              <div className="h-16 flex items-center">Home</div>
            </Link>
          </li>
          <li className="px-4 sm:px-10 border-b border-gray-300 dark:border-gray-800">
            <Link to="/posts">
              <div className="h-16 flex items-center">Posts</div>
            </Link>
          </li>
        </ul>
      </nav>
      <MenuAuthNav />
    </div>
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
