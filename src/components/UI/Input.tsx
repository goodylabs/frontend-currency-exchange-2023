import {forwardRef, LegacyRef} from "react";
import classes from "../../sass/components/Input.module.scss";
import {ErrorObject} from "../../types/types";

interface InputProps {
    type: string,
    placeholder: string,
    error: ErrorObject
}
const Input = forwardRef(function Input ({type, placeholder, error}:InputProps, ref:LegacyRef<HTMLInputElement> | undefined){

  return <input type={type} ref={ref} className={error.isError ? `${classes.input} ${classes['input--err']}` : classes.input} placeholder={placeholder}/>
})
export default Input