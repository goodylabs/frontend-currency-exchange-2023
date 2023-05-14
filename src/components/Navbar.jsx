import { ArrowsRightLeftIcon, BanknotesIcon, TrophyIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import routes from '../common/routes';
import NavbarItem from './NavbarItem';

const items = [
  { name: 'Waluty', link: routes.currencies, icon: BanknotesIcon },
  { name: 'Złoto', link: routes.gold, icon: TrophyIcon },
  { name: 'Konwerter', link: routes.converter, icon: ArrowsRightLeftIcon },
];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex w-full max-w-xs flex-col gap-12 border-r-2 bg-zinc-100 px-8 py-12">
      <div className="flex flex-col gap-1">
        <span
          className={clsx(
            'px-2.5 text-xl font-semibold',
            pathname === routes.gold ? 'text-yellow-500' : 'text-indigo-500',
          )}
        >
          Currency Exchange
        </span>
        <span className="text-md px-2.5 font-medium text-zinc-500">
          by{' '}
          <a
            className="hover:underline"
            href="https://github.com/kwawrzynczak"
            target="_blank"
            rel="noreferrer"
          >
            @kwawrzynczak
          </a>
        </span>
      </div>
      <nav className="flex flex-col gap-6">
        {items.map((item) => (
          <NavbarItem key={item.name} name={item.name} link={item.link} Icon={item.icon} />
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
