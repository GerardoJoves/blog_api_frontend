import { Link } from 'react-router';

export default function AuthNav() {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link to="/login">
            <div className="h-12 px-5 flex items-center">Log In</div>
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <div className="h-12 px-5 flex items-center bg-sky-600 rounded-lg">
              Sign Up
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
