import classes from "./Modal.module.css";
import Backdrop from "./Backdrop";
import ReactDOM from "react-dom";

const ModalOverlay = (props) => {
  return (
    <div class={classes.modal}>
      <img src={props.img} alt={props.alt} className={classes.image} />
    </div>
  );
};

const ImageModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay img={props.img} alt={props.alt} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default ImageModal;
