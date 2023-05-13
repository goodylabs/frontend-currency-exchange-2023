import classes from "../../sass/components/CurrenciesList.module.scss";
import {useContext, useState} from "react";
import Modal from "../UI/Modal";
import CurrencyView from "./CurrencyView";
import ConverterView from "../Converter/ConverterView";
import {converterContext, ConverterContext} from "../../context/ConverterProvider";

interface CurrencyItemProps {
    currency: string,
    code: string,
    mid: number,
    converterItem?: boolean
}
const CurrencyItem = ({currency, code, mid, converterItem = false}:CurrencyItemProps) => {
    const converterCtx = useContext<ConverterContext>(converterContext);
    const[modalOpen, setModalOpen] = useState<boolean>(false);
  return (
      <>
          <li onClick={() => setModalOpen(true)} className={classes.currencies__list__item}>
              <div>
                  <p>{code}</p>
                  <p className={classes.currencies__list__item__name}>{currency}</p>
              </div>
              <div>
                  <p className={classes.currencies__list__item__rate}>{converterItem ? (converterCtx.plnValue * mid) .toFixed(5): mid} {converterItem ? code : 'PLN'}</p>
              </div>
          </li>
          {(modalOpen && !converterItem) && <Modal closeModalFn={setModalOpen}><CurrencyView currency={currency} code={code} mid={mid} closeModalFn={setModalOpen}/></Modal>}
          {(modalOpen && converterItem) && <Modal closeModalFn={setModalOpen}><ConverterView closeModalFn={setModalOpen} code={code} mid={mid}/></Modal>}
      </>

  )
}
export default CurrencyItem;