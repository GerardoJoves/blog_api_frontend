import type { ReactNode } from 'react';

export default function AuthFormSubmitBtn({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      className="w-full bg-sky-300 dark:bg-sky-600 hover:cursor-pointer hover:bg-sky-400 hover:dark:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 text-center"
    >
      {children}
    </button>
  );
}
