import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import classes from "../../sass/components/CurrencyView.module.scss";
import CurrencyChart from "./CurrencyChart";
import useFetch from "../../hooks/use-fetch";
import {useEffect, useState} from "react";

interface CurrencyViewProps {
    currency: string,
    code: string,
    mid: number,
    closeModalFn: (value: (((prevState: boolean) => boolean) | boolean)) => void
}
export type LastExchangeData = {
    table: string,
    currency: string,
    code: string,
    rates: {
        no: string,
        effectiveDate: Date,
        mid: number
    }[]
}
const CurrencyView = ({currency,code,mid, closeModalFn}:CurrencyViewProps) => {
    const {loading, error, fetchData} = useFetch();
    const [fetchedData, setFetchedData] = useState<LastExchangeData>({table: "", currency, code, rates:[] });

    useEffect(() =>{
        const getData = async () => {
            const data = await fetchData(`http://api.nbp.pl/api/exchangerates/rates/A/${code}/last/14`);
            setFetchedData(data);
        }
        getData()
    }, [fetchData])
  return (
      <div className={classes.view}>
          <div className={classes.view__header}>
              <h2>Details</h2>
              <button onClick={()=> closeModalFn(false)} className={classes.view__close}><FontAwesomeIcon icon={faXmark} inverse/></button>
          </div>
          <div>
              {error && <p>{error}</p>}
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
          <div className={classes.view__chart}>
              <h3>Exchange rate history (last 14 days)</h3>
              <CurrencyChart data={fetchedData} loading={loading}/>
          </div>
      </div>
  )
}
export default CurrencyView;