import CurrencySelectable from "./CurrencySelectable";
import classes from "../../sass/components/CurrencyBox.module.scss";
import currencyObj from "../../utility/globals/currencyObject";
import {RatesObject} from "../../types/types";
interface CurrencyBoxProps {
    setSelectedCurrencies: (currencyCode: string, checked?: boolean) => void,
    initData: RatesObject[]
}
const CurrencyBox = ({setSelectedCurrencies, initData}:CurrencyBoxProps) => {
  return (
      <div className={classes.box}>
        <h2>Available currencies</h2>
        <p>Select up to 5 currencies</p>
      <div className={classes.selectables}>
          {currencyObj.map((currency => <CurrencySelectable key={currency.code} label={currency.code} fullName={currency.currency}  initData={initData} />))}
      </div>
      </div>
  )
}
export default CurrencyBox;