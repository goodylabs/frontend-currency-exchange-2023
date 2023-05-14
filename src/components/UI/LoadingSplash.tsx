import classes from "../../sass/components/Splash.module.scss";
import {GridLoader} from "react-spinners";

const LoadingSplash = () => {
  return (
      <div className={classes.splash}>
        <GridLoader color="#3268CDFF" className={classes.splash__loader}/>
      </div>
  )
}
export default LoadingSplash;