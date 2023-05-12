import {forwardRef} from "react";
import classes from "../../sass/components/Input.module.scss";

interface InputProps {
    type: string,
    placeholder: string
}
const Input = forwardRef(function Input ({type, placeholder}:InputProps, ref){

  return <input type={type} ref={ref} className={classes.input} placeholder={placeholder} defaultValue={2}/>
})
export default Input