import React from "react";
import classes from "./Navigations.module.css";
import NavItem from "./NavItem";
import NavBar from "./Navbar";
const AdminNavigation = () => {
  return (
    <NavBar>
      <ul className={classes.navMenu}>
        <div className={classes.first}>
          <div className={classes.underline}>
            <h1 className={classes.title}>Admin page</h1>
          </div>
        </div>
        <NavItem text={"Main page"} link={"/"} />
        <NavItem color={"lightGreen"} text={"Users"} link={"/admin"} />
        <NavItem color={"green"} text={"Posts"} link={"/admin/posts"} />

        <NavItem
          color={"green"}
          text={"Categories"}
          link={"/admin/categories"}
        />
      </ul>
    </NavBar>
  );
};

export default AdminNavigation;
