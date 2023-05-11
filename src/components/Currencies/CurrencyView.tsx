import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
interface CurrencyViewProps {
    currency: string,
    code: string,
    mid: number,
    closeModalFn: (value: (((prevState: boolean) => boolean) | boolean)) => void
}
const CurrencyView = ({currency,code,mid, closeModalFn}:CurrencyViewProps) => {
  return (
      <div>
          <button onClick={()=> closeModalFn(false)}><FontAwesomeIcon icon={faXmark} inverse/></button>
          <div>
              <h3>Currency name:</h3>
              <p>{currency}</p>
              <h3>Currency code:</h3>
              <p>{code}</p>
              <h3>Current exchange rate:</h3>
              <p>{mid}</p>
          </div>
          <hr/>
          <div>
              <h3>Exchange rate history</h3>
              {/*//TODO:wykres*/}
          </div>
      </div>
  )
}
export default CurrencyView;