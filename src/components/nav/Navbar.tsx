import NavItem from "./NavItem";
import classes from "../../sass/components/NavBar.module.scss";
import NavDrawer from "./NavDrawer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  return (
      <nav className={classes.nav}>
          <div className={classes.nav__logo}><p>CurrencyHub</p></div>
          <div className={classes.nav__items}>
            <NavItem path={'/'}>Currencies</NavItem>
            <NavItem path={'/gold'}>Gold prices</NavItem>
            <NavItem path={'/converter'}>Converter</NavItem>
          </div>
          <button onClick={() => setDrawerOpen(true)} className={classes.nav__bars}><FontAwesomeIcon icon={faBars} inverse/></button>
          {drawerOpen && <NavDrawer setDrawerOpen={setDrawerOpen}/> }
      </nav>
  )
}
export default Navbar;