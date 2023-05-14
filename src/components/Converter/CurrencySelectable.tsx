import classes from "../../sass/components/CurrencyBox.module.scss";
import {RatesObject, tableAResponse} from "../../types/types";
import {useContext, useRef} from "react";
import {useLoaderData} from "react-router-dom";
import {converterContext} from "../../context/ConverterProvider";
import {ConverterContext} from '../../types/types'

interface SelectableProps {
  label: string,
  fullName: string,
    savedCurrencies: RatesObject[]
    addItem: (item: RatesObject) => void ,
    removeItem: (callback: (item:RatesObject) => boolean ) => void
}
const CurrencySelectable = ({label, fullName, savedCurrencies, addItem, removeItem}:SelectableProps) => {
    const loaderData = useLoaderData() as tableAResponse[];
    const converterCtx= useContext<ConverterContext>(converterContext);
    const checkboxRef = useRef<HTMLInputElement | null>(null);
    const inSavedCurrencies = savedCurrencies.some(savedItem => savedItem.code === label);
    const changeSelectedCurrencies = () => {
        if(checkboxRef.current?.checked){
            const desiredCurrency = loaderData[0].rates.find(currency => currency.code === label)!;
            addItem(desiredCurrency);

            converterCtx.setSelectedCurrencies(prevState => [...prevState, desiredCurrency])
        }
        else{
            const filteredCurrencies = converterCtx.selectedCurrencies.filter(currency => currency.code !== label);
            removeItem((item) => item.code !== label);
            converterCtx.setSelectedCurrencies(filteredCurrencies);
        }
    }
  return (
      <div className={classes.selectables__selectable}>
        <input id={label} disabled={(converterCtx.selectedCurrencies.length === 5 && !checkboxRef.current?.checked)} defaultChecked={inSavedCurrencies} onChange={changeSelectedCurrencies} ref={checkboxRef} type={"checkbox"} className={classes.selectables__selectable__checkbox}/>
        <label htmlFor={label} className={classes.selectables__selectable__label}>
          <div className={classes.selectables__selectable__label__box}>
          <p>{label}</p>
          <p>{fullName}</p>
        </div>
        </label>
      </div>
  )
}
export default CurrencySelectable;