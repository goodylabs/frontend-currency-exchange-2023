import {useLoaderData, useNavigation} from "react-router-dom";
import classes from "../../sass/components/CurrenciesList.module.scss";
import CurrencyItem from "./CurrencyItem";
import {tableAResponse} from "../../types/types";


const CurrencyList = () => {
    const loaderData = useLoaderData() as tableAResponse[];
    const navigation = useNavigation();
    const responseObj = loaderData[0] as tableAResponse;
  return (
        <div className={classes.currencies}>
            <div className={classes.currencies__header}>
                <h3>Exchange rate</h3>
                <p>Last update: {responseObj.effectiveDate.toString()}</p>
            </div>
            <hr className={classes.currencies__hr}/>
            {navigation.state === "loading" && <p>Loading exchanges rates</p>}
            <ul className={classes.currencies__list}>
                {responseObj.rates.map((rate) => <CurrencyItem key={rate.code} currency={rate.currency} code={rate.code} mid={rate.mid}/>) }
            </ul>
        </div>

  )
}
export default CurrencyList;