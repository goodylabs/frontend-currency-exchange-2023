import classes from "../../sass/components/CurrencyBox.module.scss";
import {RatesObject, tableAResponse} from "../../types/types";
import {useContext, useRef} from "react";
import {useLoaderData} from "react-router-dom";
import {ConverterContext, converterContext} from "../../context/ConverterProvider";

interface SelectableProps {
  label: string,
  fullName: string,
}
const CurrencySelectable = ({label, fullName}:SelectableProps) => {
    const loaderData = useLoaderData() as tableAResponse[];
    const converterCtx= useContext<ConverterContext>(converterContext);
    // console.log(loaderData)
    const checkboxRef = useRef<HTMLInputElement | null>(null);
    const changeSelectedCurrencies = () => {
        if(checkboxRef.current?.checked){
            const desiredCurrency = loaderData[0].rates.find(currency => currency.code === label);
            converterCtx.setSelectedCurrencies(prevState => [...prevState, desiredCurrency])
        }
        else{
            const filteredCurrencies = converterCtx.selectedCurrencies.filter(currency => currency.code !== label);
            converterCtx.setSelectedCurrencies(filteredCurrencies);
        }

    }
  return (
      <div className={classes.selectables__selectable}>
        <input id={label} disabled={(converterCtx.selectedCurrencies.length === 5 && !checkboxRef.current?.checked)} onChange={changeSelectedCurrencies} ref={checkboxRef} type={"checkbox"} className={classes.selectables__selectable__checkbox}/>
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