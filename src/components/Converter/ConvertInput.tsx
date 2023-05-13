import Input from "../UI/Input";
import {useContext, useRef} from "react";
import classes from "../../sass/components/ConverterInput.module.scss";
import Button from "../UI/Button";
import {faRotate} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {converterContext} from "../../context/ConverterProvider";
import {ConverterContext} from '../../types/types'

interface ConverterInputProps {
    closeModalFn: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    mid: number
}
const ConvertInput = ({closeModalFn, mid}:ConverterInputProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const converterCtx = useContext<ConverterContext>(converterContext);
  const convertHandler = () => {
    converterCtx.convertValue(parseFloat(ref.current?.value as string), mid)
    closeModalFn(false);
  }
  return (
      <div className={classes['converter-container']}>
        <Input type={'number'} ref={ref} placeholder="Value..."/>
        <Button clickCallback={convertHandler}><FontAwesomeIcon icon={faRotate}/> Convert</Button>
      </div>

  )
}
export default ConvertInput;