import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

export type Page = {
  num: number;
  path: string;
  isActive: boolean;
};

type PaginationControlProps = { pages: Page[] };

export default function PaginationControl({ pages }: PaginationControlProps) {
  const currPage = pages.findIndex((p) => p.isActive);
  const prevPage = currPage > 0 ? pages[currPage - 1] : null;
  const nextPage = currPage < pages.length - 1 ? pages[currPage + 1] : null;

  return (
    <div className="flex border rounded-xs overflow-hidden border-neutral-400 dark:border-gray-700">
      {prevPage && (
        <Link
          to={prevPage.path}
          className="p-2 hover:bg-neutral-200 dark:hover:bg-gray-900 text-gray-400 dark:dark:text-gray-600"
        >
          <ChevronLeft size={22} />
        </Link>
      )}
      {pages.map((page) => (
        <Link
          to={page.path}
          key={page.num}
          className={`px-4 py-2 ${page.isActive ? 'bg-neutral-400 text-white dark:bg-gray-700' : 'hover:bg-neutral-200 dark:hover:bg-gray-900'}`}
        >
          {page.num}
        </Link>
      ))}
      {nextPage && (
        <Link
          to={nextPage.path}
          className="p-2 hover:bg-neutral-200 dark:hover:bg-gray-900 text-gray-400 dark:dark:text-gray-600"
        >
          <ChevronRight size={22} />
        </Link>
      )}
    </div>
  );
}
