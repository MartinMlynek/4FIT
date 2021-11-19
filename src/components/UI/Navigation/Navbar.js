import classes from "./Navbar.module.css";

const NavBar = (props) => {
  const isSecond = props.isSecond;
  const navClasses = isSecond
    ? `${classes.sideNav} ${classes.secondBar}`
    : classes.sideNav;
  return <nav className={navClasses}>{props.children}</nav>;
};

export default NavBar;
