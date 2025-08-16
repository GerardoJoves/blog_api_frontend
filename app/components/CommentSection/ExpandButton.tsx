import type { ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type ExpandButtonProps = {
  children: ReactNode;
  onClick: () => void;
  expanded?: boolean;
};

export default function ExpandButton({
  onClick,
  children,
  expanded = false,
}: ExpandButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center hover:cursor-pointer text-sky-700 dark:text-sky-500"
    >
      {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      <div className="ml-1">{children}</div>
    </button>
  );
}
