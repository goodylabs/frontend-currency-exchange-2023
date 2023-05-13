import {ReactNode} from "react";
import classes from "../../sass/components/Wrapper.module.scss";

interface WrapperProps {
    children: ReactNode,
    gridMode: boolean
}
const Wrapper = ({children, gridMode = false}:WrapperProps) => {
    const wrapperClasses = gridMode ? classes.grid : classes.wrapper;
  return (
      <div className={wrapperClasses}>
          {children}
      </div>
  )
}
export default Wrapper;