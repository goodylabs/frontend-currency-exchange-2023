import CurrencySelectable from "./CurrencySelectable";
import classes from "../../sass/components/CurrencyBox.module.scss";
import currencyObj from "../../utility/globals/currencyObject";
import useLocalStorage from "../../hooks/use-local-storage";
import {ConverterContext, RatesObject} from "../../types/types";
import {useContext, useEffect} from "react";
import {converterContext} from "../../context/ConverterProvider";

const CurrencyBox = () => {
    const {items: savedCurrencies, addItem, removeItem} = useLocalStorage<RatesObject>('currencies');
    const converterCtx= useContext<ConverterContext>(converterContext);
    useEffect(() => {
        converterCtx.setSelectedCurrencies(savedCurrencies);
    }, [converterCtx, savedCurrencies])
  return (
      <div className={classes.box}>
        <h2>Available currencies</h2>
        <p>Select up to 5 currencies</p>
      <div className={classes.selectables}>
          {currencyObj.map((currency => <CurrencySelectable key={currency.code} label={currency.code} fullName={currency.currency} addItem={addItem} removeItem={removeItem}/>))}
      </div>
      </div>
  )
}
export default CurrencyBox;