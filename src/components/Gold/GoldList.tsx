import classes from "../../sass/components/GoldList.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import GoldEntry from "./GoldEntry";
import {useContext} from "react";
import {goldContext} from "../../context/GoldProvider";
import {GoldContext} from "../../types/types";

const GoldList = () => {
    const goldCtx=useContext<GoldContext>(goldContext);

    const daysWithoutCurrent = goldCtx.goldWithGrowth.filter(entry => entry.data !== goldCtx.goldWithGrowth[0].data);

    const todayGrowth = goldCtx.goldWithGrowth[0].cena;
    const yesterdayGrowth = goldCtx.goldWithGrowth[1].cena
    const growthClasses = parseFloat(goldCtx.calcGrowth(todayGrowth, yesterdayGrowth) as string) > 0 ? classes.gold__current__growth : classes['gold__current__growth--neg'];
    const growthArrowClasses = parseFloat(goldCtx.calcGrowth(todayGrowth,yesterdayGrowth) as string) > 0 ? classes['gold__current__growth__arrow--pos'] : classes.gold__current__growth__arrow
  return (
      <div className={classes.gold}>
          <h2>Latest gold prices</h2>
              <div className={classes.gold__current}>
                  <p>{goldCtx.goldWithGrowth[0].data.toString()}</p>
                  <p>{goldCtx.goldWithGrowth[0].cena} PLN</p>
                  <p className={growthClasses}><FontAwesomeIcon icon={faArrowDown} className={growthArrowClasses}/> {goldCtx.calcGrowth(todayGrowth, yesterdayGrowth) as string}%</p>
              </div>
          <hr className={classes.gold__hr}/>
          <ul className={classes.gold__list}>
              {daysWithoutCurrent.map(entry => <GoldEntry key={entry.data as string} date={entry.data} price={entry.cena} growth={entry.growth}/>)}
          </ul>
      </div>
  )
}
export default GoldList;