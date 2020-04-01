import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";


const toolbar = props => (
  <header className={classes.Toolbar}>
    <span className={classes.Bars}>
      <i onClick={props.show} className="fas fa-bars"></i>
    </span>
    <Logo height="80%" />
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
  </header>
);

export default toolbar;
