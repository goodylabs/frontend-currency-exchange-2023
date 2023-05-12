import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import classes from "../../sass/components/CurrencyView.module.scss";
interface CurrencyViewProps {
    currency: string,
    code: string,
    mid: number,
    closeModalFn: (value: (((prevState: boolean) => boolean) | boolean)) => void
}
const CurrencyView = ({currency,code,mid, closeModalFn}:CurrencyViewProps) => {
  return (
      <div className={classes.view}>
          <div className={classes.view__header}>
              <h2>Details</h2>
              <button onClick={()=> closeModalFn(false)} className={classes.view__close}><FontAwesomeIcon icon={faXmark} inverse/></button>
          </div>
          <div>
              <div className={classes.view__info}>
                  <h3>Currency name:</h3>
                  <p>{currency}</p>
              </div>
              <div className={classes.view__info}>
                  <h3>Currency code:</h3>
                  <p>{code}</p>
              </div>
              <div className={classes.view__info}>
                  <h3>Current exchange rate:</h3>
                  <p>1 {code} = {mid} PLN</p>
              </div>

          </div>
          <hr className={classes.view__hr}/>
          <div>
              <h3>Exchange rate history (last 14 days)</h3>
              {/*//TODO:wykres*/}
          </div>
      </div>
  )
}
export default CurrencyView;