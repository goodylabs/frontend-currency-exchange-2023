import classes from "../../sass/components/NavBar.module.scss";
import NavItem from "./NavItem";
import {faCoins, faEuroSign, faRotate, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface NavDrawerProps {
    drawerOpen: boolean,
    setDrawerOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void
}
const NavDrawer = ({setDrawerOpen}:NavDrawerProps) => {
  return(
      <div className={classes.nav__drawer}>
          <button onClick={() => setDrawerOpen(false)} className={classes.nav__drawer__close}><FontAwesomeIcon icon={faXmark} inverse/></button>
          <div className={classes.nav__drawer__items}>
              <NavItem path={'/'}><FontAwesomeIcon icon={faEuroSign}/> Exchanges</NavItem>
              <NavItem path={'/gold'}><FontAwesomeIcon icon={faCoins}/> Gold prices</NavItem>
              <NavItem path={'/converter'}><FontAwesomeIcon icon={faRotate}/> Converter</NavItem>
          </div>

      </div>
  )
}

export default NavDrawer;