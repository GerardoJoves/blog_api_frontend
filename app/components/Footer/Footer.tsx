import PoweredBy from './PoweredBy';
import SourceCode from './SourceCode';

import GithubLight from './icons/github_light.svg?react';
import GithubDark from './icons/github_dark.svg?react';

export default function Footer() {
  return (
    <div className="px-4 sm:px-10 lg:px-14 pt-18 border-t border-neutral-400 dark:border-gray-700">
      <div className="flex flex-wrap justify-between gap-x-14 gap-y-8">
        <div>
          <PoweredBy />
        </div>
        <div>
          <SourceCode />
        </div>
      </div>
      <div className="mt-10">
        <p className="flex justify-center pt-6 pb-8 text-gray-700 dark:dark:text-gray-400">
          <span className="whitespace-pre">Made by </span>
          <a
            href="https://github.com/GerardoJoves"
            target="_blank"
            className="flex gap-2 items-center hover:underline"
          >
            <span>Gerardo Joves</span>
            <GithubLight width={20} height={20} className="dark:hidden" />
            <GithubDark width={20} height={20} className="hidden dark:block" />
          </a>
        </p>
      </div>
    </div>
  );
}
