import classes from "../../sass/components/GoldList.module.scss";
import GoldEntry from "./GoldEntry";
import {useContext} from "react";
import {goldContext} from "../../context/GoldProvider";
import {GoldContext} from "../../types/types";

const GoldList = () => {
    const goldCtx=useContext<GoldContext>(goldContext);
  return (
      <div className={classes.gold}>
          <h2>Latest gold prices</h2>
              <div className={classes.gold__current}>
                  <p>Day</p>
                  <p>Price</p>
                  <p>Daily growth</p>
              </div>
          <hr className={classes.gold__hr}/>
          <ul className={classes.gold__list}>
              {goldCtx.goldWithGrowth.map(entry => <GoldEntry key={entry.data.toString()} date={entry.data} price={entry.cena} growth={entry.growth}/>)}
          </ul>
      </div>
  )
}
export default GoldList;