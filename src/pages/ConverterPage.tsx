import {useLoaderData} from "react-router-dom";
import Wrapper from "../components/UI/Wrapper";
import ConvertInput from "../components/Converter/ConvertInput";
import Converter from "../components/Converter/Converter";
import CurrencyBox from "../components/Converter/CurrencyBox";
import {RatesObject, tableAResponse} from "../types/types";
import {useState} from "react";

const ConverterPage = () => {
  const loaderData = useLoaderData() as tableAResponse[];
  const [selectedCurrencies, setSelectedCurrencies] = useState<RatesObject[]>([]);
    // TODO: set up selected currencies context
    const changeSelectedCurrencies = (currencyCode: string, checked?: boolean) => {
        if(selectedCurrencies.length === 5){
            return;
        }
        if(checked){
            const desiredCurrency = loaderData[0].rates.find(currency => currency.code === currencyCode);
            setSelectedCurrencies(prevState => [...prevState, desiredCurrency])
        }
        else{
            const filteredCurrencies = selectedCurrencies.filter(currency => currency.code !== currencyCode);
            setSelectedCurrencies(filteredCurrencies);
        }

    }
  return(
      <Wrapper>
        <ConvertInput/>
        <Converter selectedCurrencies={selectedCurrencies}/>
        <CurrencyBox setSelectedCurrencies={changeSelectedCurrencies}/>
      </Wrapper>
  )
}
export default ConverterPage;