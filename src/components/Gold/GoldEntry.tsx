import classes from "../../sass/components/GoldList.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
interface GoldEntryProps {
    date: Date,
    price: number,
    growth: string

}
const GoldEntry = ({date,price, growth}:GoldEntryProps) => {
    const growthClasses = growth >= 0 ? classes.gold__current__growth : classes['gold__current__growth--neg'];
    const growthArrowClasses = growth >= 0 ? classes['gold__current__growth__arrow--pos'] : classes.gold__current__growth__arrow
  return (
      <li className={classes.gold__list__entry}>
          <p>{date}</p>
          <p>{price} PLN</p>
          <p className={growthClasses}><FontAwesomeIcon icon={faArrowDown} className={growthArrowClasses}/> {growth}%</p>
      </li>
  )
}
export default GoldEntry;