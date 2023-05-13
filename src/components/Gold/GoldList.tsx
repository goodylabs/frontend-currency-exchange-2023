import {goldEntries} from "../../pages/GoldPage";
import classes from "../../sass/components/GoldList.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import GoldEntry from "./GoldEntry";
import {useContext, useEffect, useState} from "react";
import {goldContext, GoldContext} from "../../context/GoldProvider";

interface GoldListProps {
    goldEntries: goldEntries
}

const GoldList = ({goldEntries}:GoldListProps) => {
    const goldCtx=useContext<GoldContext>(goldContext);
    const todayGrowth = goldEntries[goldEntries.length - 1].cena;
    const yesterdayGrowth = goldEntries[goldEntries.length - 2].cena
    const growthClasses = goldCtx.calcGrowth(todayGrowth, yesterdayGrowth) > 0 ? classes.gold__current__growth : classes['gold__current__growth--neg'];
    const growthArrowClasses = goldCtx.calcGrowth(todayGrowth,yesterdayGrowth) > 0 ? classes['gold__current__growth__arrow--pos'] : classes.gold__current__growth__arrow
  return (
      <div className={classes.gold}>
          <h2>Latest gold prices</h2>
              <div className={classes.gold__current}>
                  <p>{goldEntries[goldEntries.length - 1].data}</p>
                  <p>{goldEntries[goldEntries.length - 1].cena} PLN</p>
                  <p className={growthClasses}><FontAwesomeIcon icon={faArrowDown} className={growthArrowClasses}/> {goldCtx.calcGrowth(todayGrowth, yesterdayGrowth)}%</p>
              </div>
          <hr className={classes.gold__hr}/>
          <ul className={classes.gold__list}>
              {goldCtx.goldWithGrowth.map(entry => <GoldEntry key={entry.data} date={entry.data} price={entry.cena} growth={entry.growth}/>)}
          </ul>
      </div>
  )
}
export default GoldList;