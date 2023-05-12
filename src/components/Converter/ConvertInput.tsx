import Card from "../UI/Card";
import Input from "../UI/Input";
import {useEffect, useRef} from "react";
import classes from "../../sass/components/ConverterInput.module.scss";
import Button from "../UI/Button";
import {faRotate} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ConvertInput = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  return (
      <div className={classes['converter-container']}>
        <Input type={'number'} ref={ref} placeholder="Enter the value in PLN"/>
        <Button clickCallback={() => {}}><FontAwesomeIcon icon={faRotate}/> Convert</Button>
      </div>

  )
}
export default ConvertInput;