import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const NavbarItem = ({ Icon, name, link }) => (
  <NavLink
    to={link}
    className={({ isActive }) =>
      clsx(
        'group flex items-center gap-3 rounded-2xl p-2.5 transition duration-300 hover:scale-105',
        isActive
          ? 'bg-white text-zinc-900 shadow-2xl shadow-zinc-900/10'
          : 'bg-white/0 text-zinc-500 hover:bg-white hover:text-zinc-900 hover:shadow-2xl hover:shadow-zinc-900/10',
      )
    }
  >
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200">
      <Icon className="h-5 w-5" />
    </div>
    <span className="text-md font-medium">{name}</span>
  </NavLink>
);

export default NavbarItem;
