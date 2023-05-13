import { Link } from 'react-router-dom';
import routes from '../common/routes';

const Navbar = () => {
  return (
    <nav className=" border-gray-200 bg-white shadow-md">
      <div className="mx-auto flex max-w-screen-xl items-center justify-center gap-10">
        <Link to={routes.currencies} className="p-4 hover:bg-slate-300">
          Currencies
        </Link>
        <Link to={routes.currency} className="p-4 hover:bg-slate-300">
          Currency
        </Link>
        <Link to={routes.gold} className="p-4 hover:bg-slate-300">
          Gold
        </Link>
        <Link to={routes.converter} className="p-4 hover:bg-slate-300">
          Converter
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
