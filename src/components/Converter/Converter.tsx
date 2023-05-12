import Card from "../UI/Card";
import CurrencyItem from "../Currencies/CurrencyItem";
import {RatesObject} from "../../types/types";
import {useContext} from "react";
import {converterContext, ConverterContext} from "../../context/ConverterProvider";

const Converter = () => {
    const converterCtx = useContext<ConverterContext>(converterContext);
  return (
      <Card>
        <ul>
            {converterCtx.selectedCurrencies.length === 0 && <p>Selected currencies will show up here</p>}
            {converterCtx.selectedCurrencies.map(currency => <CurrencyItem currency={currency.currency} code={currency.code} mid={currency.mid}/>)}
        </ul>
      </Card>
  )
}
export default Converter