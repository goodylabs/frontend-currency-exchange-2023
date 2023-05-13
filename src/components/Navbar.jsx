import { Link } from "react-router-dom";
import routes from "../common/routes";

const Navbar = () => {
  return (
    <div className="z-0 flex justify-center gap-10 bg-white shadow-md">
      <Link to={routes.currencies}>Currencies</Link>
      <Link to={routes.currency}>Currency</Link>
      <Link to={routes.gold}>Gold</Link>
      <Link to={routes.converter}>Converter</Link>
    </div>
  );
};

export default Navbar;
