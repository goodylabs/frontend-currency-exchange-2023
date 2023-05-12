import {goldEntries} from "../../pages/GoldPage";
import classes from "../../sass/components/GoldList.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";

interface GoldListProps {
    goldEntries: goldEntries
}
const GoldList = ({goldEntries}:GoldListProps) => {
    const calcGrowth = (todayValue: number, yesterdayValue: number): string => {
        const result = (todayValue * 100) / yesterdayValue;
      return (result - 100).toFixed(2);
    }
    const todayGrowth = goldEntries[goldEntries.length - 1].cena;
    const yesterdayGrowth = goldEntries[goldEntries.length - 2].cena
    const growthClasses = calcGrowth(todayGrowth, yesterdayGrowth) > 0 ? classes.gold__current__growth : classes['gold__current__growth--neg'];
    const growthArrowClasses = calcGrowth(todayGrowth,yesterdayGrowth) > 0 ? classes['gold__current__growth__arrow--pos'] : classes.gold__current__growth__arrow

  return (
      <div className={classes.gold}>
          <h2>Latest gold prices</h2>
              <div className={classes.gold__current}>
                  <p>Today</p>
                  <p>{goldEntries[goldEntries.length - 1].cena} PLN</p>
                  <p className={growthClasses}><FontAwesomeIcon icon={faArrowDown} className={growthArrowClasses}/> {calcGrowth.call(this, todayGrowth, yesterdayGrowth)}%</p>
              </div>
          <hr className={classes.gold__hr}/>
          <ul>

          </ul>
      </div>
  )
}
export default GoldList;