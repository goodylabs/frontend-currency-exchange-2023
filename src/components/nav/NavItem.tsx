import {NavLink} from "react-router-dom";
import {ReactNode} from "react";
interface NavItemProps {
    path: string,
    children: ReactNode
}
const NavItem = ({path, children}:NavItemProps) => {
  return <NavLink to={path} end>{children}</NavLink>
}
export default NavItem;