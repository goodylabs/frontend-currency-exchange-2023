import ReactDOM from "react-dom";
import classes from "../../sass/components/Modal.module.scss";
import {ReactNode} from "react";
interface ModalProps {
    children: ReactNode,
    closeModalFn: (value: (((prevState: boolean) => boolean) | boolean)) => void
}
const Overlay = () => {
    return <div className={classes.overlay}></div>
}
const ModalContent = ({children}:ModalProps) => {
    return <div className={classes.modal__box}>
        {children}
    </div>
}

const Modal = ({children}:ModalProps) => {
    return(
        <>
            {ReactDOM.createPortal(<Overlay/>, document.getElementById('modal'))}
            {ReactDOM.createPortal(<ModalContent>{children}</ModalContent>, document.getElementById('modal'))}
        </>
    );
}
export default Modal;