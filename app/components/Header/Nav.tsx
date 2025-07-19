import { Link } from 'react-router';

export default function Nav() {
  return (
    <nav>
      <ul className="flex gap-3">
        <li>
          <Link to="/">
            <div className="h-12 px-3 flex items-center">Home</div>
          </Link>
        </li>
        <li>
          <Link to="/categories">
            <div className="h-12 px-3 flex items-center">Categories</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
