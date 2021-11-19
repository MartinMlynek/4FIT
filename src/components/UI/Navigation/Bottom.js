import React, { useContext, useState, useEffect } from "react";

import classes from "./Bottom.module.css";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";
import UserContext from "../../../store/UserContext";
import SettingsModal from "../../SettingsModal";
const Bottom = () => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const showModal = () => setShowSettingsModal(true);
  const hideModal = () => setShowSettingsModal(false);
  const userCtx = useContext(UserContext);
  const [logText, setLogText] = useState("Login");
  const logged = userCtx.user !== null;
  console.log("HEREeA");
  console.log(userCtx);
  useEffect(() => {
    setLogText(logged ? "Logout" : "Login");
  }, userCtx.user);
  return (
    <div className={classes.box}>
      {showSettingsModal && <SettingsModal onConfirm={hideModal} />}
      <NavItem text={logText} color="white" link={"/" + logText} />
      {logged && (
        <NavItem text="Settings" color="white" updateCategoryFunc={showModal} />
      )}
    </div>
  );
};

export default Bottom;
