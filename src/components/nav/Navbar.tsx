import NavItem from "./NavItem";
import classes from "../../sass/components/NavBar.module.scss";
import NavDrawer from "./NavDrawer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faCoins, faEuroSign, faRotate} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const {pathname} = useLocation();
    useEffect(() => {
        setDrawerOpen(false);
    }, [pathname])
  return (
      <nav className={classes.nav}>
          <div className={classes.nav__logo}><p>CurrencyHub</p></div>
          <div className={classes.nav__items}>
            <NavItem path={'/'}><FontAwesomeIcon icon={faEuroSign}/> Exchanges</NavItem>
            <NavItem path={'/gold'}><FontAwesomeIcon icon={faCoins}/> Gold prices</NavItem>
            <NavItem path={'/converter'}><FontAwesomeIcon icon={faRotate}/>  Converter</NavItem>
          </div>
          <button onClick={() => setDrawerOpen(true)} className={classes.nav__bars}><FontAwesomeIcon icon={faBars} inverse/></button>
          {drawerOpen && <NavDrawer setDrawerOpen={setDrawerOpen}/> }
      </nav>
  )
}
export default Navbar;