import Input from "../UI/Input";
import {useContext, useRef, useState} from "react";
import classes from "../../sass/components/ConverterInput.module.scss";
import Button from "../UI/Button";
import {faRotate} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {converterContext} from "../../context/ConverterProvider";
import {ConverterContext, ErrorObject} from '../../types/types'

interface ConverterInputProps {
    closeModalFn: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    mid: number,
    error: ErrorObject,
    setErrFn: (value: (((prevState: ErrorObject) => ErrorObject) | ErrorObject)) => void
}
const ConvertInput = ({closeModalFn, mid, error, setErrFn}:ConverterInputProps) => {

  const ref = useRef<HTMLInputElement | null>(null);
  const converterCtx = useContext<ConverterContext>(converterContext);
  const convertHandler = () => {
      if(ref.current?.value === '' || parseFloat(ref.current?.value as string) < 0.0){
          setErrFn({isError: true, message: "Please enter a correct value"});
          return;
      }
    converterCtx.convertValue(parseFloat(ref.current?.value as string), mid)
    setErrFn({isError: false, message: ""});
    closeModalFn(false);
  }
  return (
      <div className={classes['converter-container']}>
        <Input type={'number'} ref={ref} placeholder="Value..." error={error}/>
        <Button clickCallback={convertHandler}><FontAwesomeIcon icon={faRotate}/> Convert</Button>
      </div>

  )
}
export default ConvertInput;