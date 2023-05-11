import classes from "../../sass/components/CurrenciesList.module.scss";

interface CurrencyItemProps {
    currency: string,
    code: string,
    mid: number
}
const CurrencyItem = ({currency, code, mid}:CurrencyItemProps) => {
  return (
      <li className={classes.currencies__list__item}>
          <div>
              <p>{code}</p>
              <p className={classes.currencies__list__item__name}>{currency}</p>
          </div>
          <div>
              <p className={classes.currencies__list__item__rate}>{mid} PLN</p>
          </div>
      </li>
  )
}
export default CurrencyItem;