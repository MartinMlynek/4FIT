import Card from "./UI/Card";
import classes from "./Modal.module.css";
import Button from "./UI/Button";
import { React, useContext } from "react";
import Backdrop from "./Backdrop";
import ReactDOM from "react-dom";
import UserContext from "../store/UserContext";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
const ModalOverlay = (props) => {
  const navigation = useNavigate();

  const adminHandler = () => {
    navigation("/admin", { replace: false });
    props.onConfirm();
  };

  const profileHandler = () => {
    navigation("/profile", { replace: false });
    props.onConfirm();
  };

  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <span>{props.title}</span>
        <span className={classes.cross} onClick={props.onConfirm}>
          X
        </span>
      </header>
      <div className={classes.content}>
        <Button className={classes["settings-button"]} onClick={profileHandler}>
          Profile
        </Button>
        {props.isAdmin && (
          <Button className={classes["settings-button"]} onClick={adminHandler}>
            Admin page
          </Button>
        )}
      </div>
    </Card>
  );
};

const SettingsModal = (props) => {
  const admin = false;
  const userCtx = useContext(UserContext);

  const isAdmin = userCtx.user.role.name === "admin";
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={"Settings"}
          onConfirm={props.onConfirm}
          isAdmin={isAdmin}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default SettingsModal;
