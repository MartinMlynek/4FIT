import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  const addClasses = `${classes.button} ${props.className}`;
  return (
    <button
      className={addClasses}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
