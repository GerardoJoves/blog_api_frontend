import ReactLogo from './icons/react.svg?react';
import ReactRouterDark from './icons/react_router_dark.svg?react';
import ReactRouterLight from './icons/react_router_light.svg?react';
import Tailwind from './icons/tailwind.svg?react';
import ExpressDark from './icons/express_dark.svg?react';
import ExpressLight from './icons/express_light.svg?react';
import PrismaLight from './icons/prisma_light.svg?react';
import PrismaDark from './icons/prisma_dark.svg?react';

export default function Poweredby() {
  const commonLiClasses = 'flex gap-2 mb-2';
  const commonIconSize = 25;

  return (
    <div>
      <h4 className="mb-6 font-bold text-lg">Powered By:</h4>
      <ul className="grid md:grid-cols-[10rem_10rem]">
        <li className={commonLiClasses}>
          <ReactLogo width={commonIconSize} height={commonIconSize} />
          <a href="https://react.dev/" target="_blank">
            React
          </a>
        </li>
        <li className={commonLiClasses}>
          <ReactRouterLight
            width={commonIconSize}
            height={commonIconSize}
            className="dark:hidden"
          />
          <ReactRouterDark
            width={commonIconSize}
            height={commonIconSize}
            className="hidden dark:block"
          />
          <a href="https://reactrouter.com/" target="_blank">
            React Router
          </a>
        </li>
        <li className={commonLiClasses}>
          <Tailwind width={commonIconSize} height={commonIconSize} />
          <a href="https://tailwindcss.com/" target="_blank">
            Tailwind
          </a>
        </li>
        <li className={commonLiClasses}>
          <ExpressLight
            width={commonIconSize}
            height={commonIconSize}
            className="dark:hidden"
          />
          <ExpressDark
            width={commonIconSize}
            height={commonIconSize}
            className="hidden dark:block"
          />
          <a href="https://expressjs.com/" target="_blank">
            Express
          </a>
        </li>
        <li className={commonLiClasses}>
          <PrismaLight
            width={commonIconSize}
            height={commonIconSize}
            className="dark:hidden"
          />
          <PrismaDark
            width={commonIconSize}
            height={commonIconSize}
            className="hidden dark:block"
          />
          <a href="https://www.prisma.io/" target="_blank">
            Prisma
          </a>
        </li>
      </ul>
    </div>
  );
}
