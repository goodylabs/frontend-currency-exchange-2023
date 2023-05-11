import classes from "../../sass/components/CurrenciesList.module.scss";
import {useState} from "react";
import Modal from "../UI/Modal";
import CurrencyView from "./CurrencyView";

interface CurrencyItemProps {
    currency: string,
    code: string,
    mid: number
}
const CurrencyItem = ({currency, code, mid}:CurrencyItemProps) => {
    const[modalOpen, setModalOpen] = useState<boolean>(false);
  return (
      <>
          <li onClick={() => setModalOpen(true)} className={classes.currencies__list__item}>
              <div>
                  <p>{code}</p>
                  <p className={classes.currencies__list__item__name}>{currency}</p>
              </div>
              <div>
                  <p className={classes.currencies__list__item__rate}>{mid} PLN</p>
              </div>
          </li>
          {modalOpen && <Modal closeModalFn={setModalOpen}><CurrencyView currency={currency} code={code} mid={mid} closeModalFn={setModalOpen}/></Modal>}
      </>

  )
}
export default CurrencyItem;