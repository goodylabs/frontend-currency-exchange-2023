import { ArrowsRightLeftIcon, BanknotesIcon, TrophyIcon } from '@heroicons/react/24/outline';
import routes from '../common/routes';
import NavbarItem from './NavbarItem';

const items = [
  { name: 'Waluty', link: routes.currencies, icon: BanknotesIcon },
  { name: 'Złoto', link: routes.gold, icon: TrophyIcon },
  { name: 'Konwerter', link: routes.converter, icon: ArrowsRightLeftIcon },
];

const Navbar = () => {
  return (
    <div className="flex w-full max-w-xs flex-col gap-12 border-r-2 bg-zinc-100 p-8">
      <span className="px-2.5 text-lg font-semibold">Currency Exchange</span>
      <nav className="flex flex-col gap-6">
        {items.map((item) => (
          <NavbarItem key={item.name} name={item.name} link={item.link} Icon={item.icon} />
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
