import Card from "../UI/Card";
import CurrencyItem from "../Currencies/CurrencyItem";
import {RatesObject} from "../../types/types";
interface ConverterProps {
    selectedCurrencies: RatesObject[]
}
const Converter = ({selectedCurrencies}:ConverterProps) => {
  return (
      <Card>
        <ul>
            {selectedCurrencies.length === 0 && <p>Selected currencies will show up here</p>}
            {selectedCurrencies.map(currency => <CurrencyItem currency={currency.currency} code={currency.code} mid={currency.mid}/>)}
        </ul>
      </Card>
  )
}
export default Converter