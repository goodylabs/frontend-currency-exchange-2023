import {goldEntries} from "../../pages/GoldPage";
import classes from "../../sass/components/GoldList.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import GoldEntry from "./GoldEntry";
import {useEffect, useState} from "react";

interface GoldListProps {
    goldEntries: goldEntries
}
type EntriesWithGrowth = {
    data: Date,
    cena: number,
    growth: string
}
const GoldList = ({goldEntries}:GoldListProps) => {
    const[entriesWithGrowth, setEntriesWithGrowth] = useState<EntriesWithGrowth[]>([]);
    const calcGrowth = (todayValue: number, yesterdayValue: number): string => {
        const result = (todayValue * 100) / yesterdayValue;
      return (result - 100).toFixed(2);
    }
    const todayGrowth = goldEntries[goldEntries.length - 1].cena;
    const yesterdayGrowth = goldEntries[goldEntries.length - 2].cena
    const growthClasses = calcGrowth(todayGrowth, yesterdayGrowth) > 0 ? classes.gold__current__growth : classes['gold__current__growth--neg'];
    const growthArrowClasses = calcGrowth(todayGrowth,yesterdayGrowth) > 0 ? classes['gold__current__growth__arrow--pos'] : classes.gold__current__growth__arrow

    const entriesPreprocessing = () =>{
        let updatedEntries:EntriesWithGrowth[] = [];
        for (let i = 0; i < goldEntries.length; i++) {
            if(i > 0){
                updatedEntries.push({...goldEntries[i], growth: calcGrowth(goldEntries[i].cena,goldEntries[i-1].cena)})
            }
            else{
                updatedEntries.push({...goldEntries[i], growth: "0.00"})
            }
        }
        updatedEntries = updatedEntries.filter(entry => entry.data !== goldEntries[goldEntries.length - 1].data);
        updatedEntries = updatedEntries.reverse();
        setEntriesWithGrowth(updatedEntries);
    }
    useEffect(() => {
        entriesPreprocessing();
    }, [])

  return (
      <div className={classes.gold}>
          <h2>Latest gold prices</h2>
              <div className={classes.gold__current}>
                  <p>Today</p>
                  <p>{goldEntries[goldEntries.length - 1].cena} PLN</p>
                  <p className={growthClasses}><FontAwesomeIcon icon={faArrowDown} className={growthArrowClasses}/> {calcGrowth.call(this, todayGrowth, yesterdayGrowth)}%</p>
              </div>
          <hr className={classes.gold__hr}/>
          <ul className={classes.gold__list}>
              {entriesWithGrowth.map(entry => <GoldEntry key={entry.data} date={entry.data} price={entry.cena} growth={entry.growth}/>)}
          </ul>
      </div>
  )
}
export default GoldList;