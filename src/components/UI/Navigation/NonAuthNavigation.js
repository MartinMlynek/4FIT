import React from "react";
import classes from "./Navigations.module.css";
import NavItem from "./NavItem";
import NavBar from "./Navbar";
const NonAuthNavigation = () => {
  return (
    <NavBar>
      <ul className={classes.navMenu}>
        <div className={classes.first}>
          <div className={classes.underline}>
            <h1 className={classes.title}>4FIT</h1>
          </div>
        </div>
        <NavItem text={"Main page"} link={"/"} />
        <NavItem color={"lightGreen"} text={"Register"} link={"/register"} />
        <NavItem color={"green"} text={"Login"} link={"/login"} />
      </ul>
    </NavBar>
  );
};

export default NonAuthNavigation;
