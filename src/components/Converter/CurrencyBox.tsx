import CurrencySelectable from "./CurrencySelectable";
import classes from "../../sass/components/CurrencyBox.module.scss";
import currencyObj from "../../utility/globals/currencyObject";

const CurrencyBox = () => {
  return (
      <div className={classes.box}>
        <h2>Available currencies</h2>
        <p>Select up to 5 currencies</p>
      <div className={classes.selectables}>
          {currencyObj.map((currency => <CurrencySelectable key={currency.code} label={currency.code} fullName={currency.currency}/>))}
      </div>
      </div>
  )
}
export default CurrencyBox;