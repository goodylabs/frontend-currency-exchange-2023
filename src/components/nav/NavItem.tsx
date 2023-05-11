import {NavLink} from "react-router-dom";
import {ReactNode} from "react";
import classes from "../../sass/components/NavItem.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
interface NavItemProps {
    path: string,
    children: ReactNode,
}
const NavItem = ({path, children}:NavItemProps) => {
  return (
          <NavLink to={path} end className={({isActive}) => isActive ? `${classes.item} ${classes['item--active']}` : classes.item}>{children}</NavLink>
  )
}
export default NavItem;