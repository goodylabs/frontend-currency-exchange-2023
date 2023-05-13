import {useLoaderData} from "react-router-dom";
import Wrapper from "../components/UI/Wrapper";
import ConvertInput from "../components/Converter/ConvertInput";
import Converter from "../components/Converter/Converter";
import CurrencyBox from "../components/Converter/CurrencyBox";
import {RatesObject, tableAResponse} from "../types/types";
import {useState} from "react";
import ConverterProvider from "../context/ConverterProvider";

const ConverterPage = () => {
  return(
      <ConverterProvider>
          <Wrapper>
              <Converter/>
              <CurrencyBox/>
          </Wrapper>
      </ConverterProvider>

  )
}
export default ConverterPage;