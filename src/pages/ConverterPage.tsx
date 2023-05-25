import Wrapper from "../components/UI/Wrapper";
import Converter from "../components/Converter/Converter";
import CurrencyBox from "../components/Converter/CurrencyBox";
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