import Card from "../UI/Card";
import CurrencyItem from "../Currencies/CurrencyItem";
import {useContext} from "react";
import {converterContext} from "../../context/ConverterProvider";
import {ConverterContext} from '../../types/types'
import classes from "../../sass/components/Converter.module.scss";

const Converter = () => {
    const converterCtx = useContext<ConverterContext>(converterContext);

  return (
      <Card>
        <h2 className={classes.converter__heading}>Active currencies</h2>
        <ul className={classes.converter__list}>
            <CurrencyItem currency={"Polski złoty"} code={"PLN"} mid={1.0} converterItem/>
            {converterCtx.selectedCurrencies.length === 0 && <li className={classes.converter__list__message}>Selected currencies will show up here</li>}
            {converterCtx.selectedCurrencies.map(currency => <CurrencyItem key={currency.code} currency={currency.currency} code={currency.code} mid={currency.mid} converterItem/>)}
        </ul>
      </Card>
  )
}
export default Converter