import { Moon, Search } from 'lucide-react';

export default function Actions() {
  return (
    <div className="flex gap-4">
      <button type="button">
        <Search />
      </button>
      <button type="button">
        <Moon />
      </button>
    </div>
  );
}
