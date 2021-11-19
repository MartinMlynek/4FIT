import React from "react";
import { Link } from "react-router-dom";
import classes from "./NavItem.module.css";

const NavItem = (props) => {
  let color;
  let isWhite;

  switch (props.color) {
    case "green":
      color = classes.green;
      break;
    case "lightGreen":
      color = classes.lightGreen;
      break;
    case "gray":
      color = classes.gray;
      break;

    case "superLightGreen":
      color = classes.superLightGreen;
      break;
    default:
      color = classes.white;

      break;
  }

  let navButton;
  if (props.link) {
    navButton = (
      <Link to={props.link}>
        <li className={classes.navItem}>
          <div className={`${classes.box} ${color}`}>
            <span className={`${classes.text}`}>{props.text}</span>
          </div>
        </li>
      </Link>
    );
  } else {
    navButton = (
      <li className={classes.navItem}>
        <div
          className={`${classes.box} ${color}`}
          onClick={() => {
            props.updateCategoryFunc(clickValue);
          }}
        >
          <span className={`${classes.text}`}>{props.text}</span>
        </div>
      </li>
    );
  }

  let clickValue = props.isSecond ? props.text : props.id;
  return navButton;
};

export default NavItem;
