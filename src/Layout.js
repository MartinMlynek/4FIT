import { Fragment } from "react";

import classes from "./Layout.module.css";
import Navigations from "./components/UI/Navigation/Navigations";
import UserProvider from "./store/UserProvider";
import NonAuthNavigation from "./components/UI/Navigation/NonAuthNavigation";
import AdminNavigation from "./components/UI/Navigation/AdminNavigation";

const Layout = (props) => {
  return (
    <>
      <UserProvider>
        {props.isMain && <Navigations />}
        {props.isAuth && <NonAuthNavigation />}
        {props.isAdmin && <AdminNavigation />}
        <main className={classes.main}>{props.children}</main>
      </UserProvider>
    </>
  );
};

export default Layout;
