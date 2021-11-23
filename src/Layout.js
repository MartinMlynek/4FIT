import { Fragment, useEffect, useContext } from "react";
import UserContext from "./store/UserContext";

import classes from "./Layout.module.css";
import Navigations from "./components/UI/Navigation/Navigations";
import UserProvider from "./store/UserProvider";
import NonAuthNavigation from "./components/UI/Navigation/NonAuthNavigation";
import AdminNavigation from "./components/UI/Navigation/AdminNavigation";
import Cookies from "universal-cookie/es6";
const Layout = (props) => {
  const userCtx = useContext(UserContext);
  const cookies = new Cookies();
  console.log("LAYOT");
  console.log();
  useEffect(() => {
    const user = cookies.get("user");
    if (user) {
      userCtx.login(user);
    }
    userCtx.getPosts();
  }, []);
  return (
    <>
      {props.isMain && <Navigations />}
      {props.isAuth && <NonAuthNavigation />}
      {props.isAdmin && <AdminNavigation />}
      <main className={classes.main}>{props.children}</main>
    </>
  );
};

export default Layout;
