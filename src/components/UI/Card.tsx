import {ReactNode} from "react";
import classes from "../../sass/components/Card.module.scss";

interface CardProps{
    children: ReactNode
}
const Card = ({children}:CardProps) => {
  return <div className={classes.card}>{children}</div>
}
export default Card;