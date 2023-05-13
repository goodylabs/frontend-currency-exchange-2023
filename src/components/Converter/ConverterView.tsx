import classes from "../../sass/components/CurrencyView.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import ConvertInput from "./ConvertInput";
import {useState} from "react";
import {ErrorObject} from "../../types/types";

interface ConverterViewProps {
    code: string,
    mid: number,
    closeModalFn: (value: (((prevState: boolean) => boolean) | boolean)) => void
}
const ConverterView = ({code, mid, closeModalFn}:ConverterViewProps) => {
    const [error, setError] = useState<ErrorObject>({isError: false, message: ""})
  return (
      <div className={classes.view}>
          <div className={classes.view__header}>
              <h2>Converting {code}</h2>
              <button onClick={()=> closeModalFn(false)} className={classes.view__close}><FontAwesomeIcon icon={faXmark} inverse/></button>
          </div>
          <div className={classes.view__info}>
              <p>Enter the value in {code} to convert</p>
              {error.isError && <p className={classes.view__info__error}>{error.message}</p>}
              <ConvertInput closeModalFn={closeModalFn} setErrFn={setError} mid={mid} error={error}/>
          </div>


      </div>
  )
}
export default ConverterView;