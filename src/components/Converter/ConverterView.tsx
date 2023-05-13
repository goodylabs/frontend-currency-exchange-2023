import classes from "../../sass/components/CurrencyView.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import ConvertInput from "./ConvertInput";
interface ConverterViewProps {
    code: string,
    mid: number,
    closeModalFn: (value: (((prevState: boolean) => boolean) | boolean)) => void
}
const ConverterView = ({code, mid, closeModalFn}:ConverterViewProps) => {
  return (
      <div className={classes.view}>
          <div className={classes.view__header}>
              <h2>Converting {code}</h2>
              <button onClick={()=> closeModalFn(false)} className={classes.view__close}><FontAwesomeIcon icon={faXmark} inverse/></button>
          </div>
          <div className={classes.view__info}>
              <p>Enter the value in {code} to convert</p>
              <ConvertInput closeModalFn={closeModalFn} mid={mid}/>
          </div>


      </div>
  )
}
export default ConverterView;