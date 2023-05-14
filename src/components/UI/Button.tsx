import {ReactNode} from "react";
import classes from "../../sass/components/Button.module.scss";

interface ButtonProps {
    clickCallback: () => void,
    children: ReactNode
}
const Button = ({clickCallback, children}:ButtonProps) => {
  return <button onClick={clickCallback} className={classes.btn}>{children}</button>
}
export default Button;