import {useLoaderData, useNavigation} from "react-router-dom";
import classes from "../../sass/components/CurrenciesList.module.scss";
import CurrencyItem from "./CurrencyItem";

type CurrencyObject = {
    currency: string,
    code: string,
    mid: number
}
type tableAResponse = {
    table: string,
    no: string,
    effectiveDate: Date,
    rates: CurrencyObject[]
}
const CurrencyList = () => {
    const loaderData = useLoaderData();
    const navigation = useNavigation();
    const responseObj = loaderData[0] as tableAResponse;
    console.log(responseObj)
  return (
        <div className={classes.currencies}>
            <div className={classes.currencies__header}>
                <h3>Exchange rate</h3>
                <p>Last update: {responseObj.effectiveDate}</p>
            </div>
            <hr className={classes.currencies__hr}/>
            <ul className={classes.currencies__list}>
                {responseObj.rates.map(rate => <CurrencyItem currency={rate.currency} code={rate.code} mid={rate.mid}/>) }
            </ul>
        </div>

  )
}
export default CurrencyList;