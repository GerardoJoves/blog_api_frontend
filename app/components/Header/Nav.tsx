import { Link } from 'react-router';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/categories"></Link>
        </li>
      </ul>
    </nav>
  );
}
