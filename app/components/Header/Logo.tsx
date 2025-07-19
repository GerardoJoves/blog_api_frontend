import { Link } from 'react-router';

export default function Logo() {
  return (
    <Link to="/">
      <div className="text-xl font-bold tracking-wide">Thought Flow</div>
    </Link>
  );
}
