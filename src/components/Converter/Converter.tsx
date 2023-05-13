import Card from "../UI/Card";
import CurrencyItem from "../Currencies/CurrencyItem";
import {RatesObject} from "../../types/types";
import {useContext, useState} from "react";
import {converterContext, ConverterContext} from "../../context/ConverterProvider";

const Converter = () => {
    const converterCtx = useContext<ConverterContext>(converterContext);

  return (
      <Card>
          <h2>Active currencies</h2>
        <ul>
            <CurrencyItem currency={"Polski złoty"} code={"PLN"} mid={1.0} converterItem/>
            {converterCtx.selectedCurrencies.length === 0 && <p>Selected currencies will show up here</p>}
            {converterCtx.selectedCurrencies.map(currency => <CurrencyItem key={currency.code} currency={currency.currency} code={currency.code} mid={currency.mid} converterItem/>)}
        </ul>
      </Card>
  )
}
export default Converter