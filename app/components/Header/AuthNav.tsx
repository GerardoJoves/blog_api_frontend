import { useContext, useState } from 'react';
import { Link } from 'react-router';

import UserContext from '../UserContext';
import WrapperDropdown from '../WrapperDropdown';
import { LogOut } from 'lucide-react';

export default function AuthNav() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useContext(UserContext);

  const closeDropdown = () => setIsOpen(false);
  const openDropdown = () => setIsOpen(true);

  return user ? (
    <div>
      <WrapperDropdown
        toggleContent={
          <img
            src={`https://ui-avatars.com/api/?name=${user.username}&rounded=true&length=1`}
            alt="Profile picture"
            className="h-9 w-9"
          />
        }
        isOpen={isOpen}
        handleClose={closeDropdown}
        handleOpen={openDropdown}
      >
        <nav className="absolute top-2 right-2 rounded shadow-3xl dark:shadow-none bg-white dark:bg-gray-800">
          <ul>
            <li>
              <Link
                to="/logout"
                className="whitespace-nowrap flex items-center gap-3 py-2.5 px-6"
              >
                <LogOut size={15} />
                Log out
              </Link>
            </li>
          </ul>
        </nav>
      </WrapperDropdown>
    </div>
  ) : (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link to="/login">
            <div className="h-12 px-5 flex items-center">Log In</div>
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <div className="h-12 px-5 flex items-center bg-sky-300 dark:bg-sky-600 rounded-lg">
              Sign Up
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
