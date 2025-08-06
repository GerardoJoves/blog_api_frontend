import { LibraryBig } from 'lucide-react';
import { Link } from 'react-router';

export default function Logo() {
  return (
    <Link to="/">
      <div className="h-12 flex items-center gap-2">
        <LibraryBig />
        <div className="text-xl font-bold tracking-wide">Blogging</div>
      </div>
    </Link>
  );
}
