import {ReactNode} from "react";
import classes from "../../sass/components/Wrapper.module.scss";

interface WrapperProps {
    children: ReactNode
}
const Wrapper = ({children}:WrapperProps) => {
  return (
      <div className={classes.wrapper}>
          {children}
      </div>
  )
}
export default Wrapper;