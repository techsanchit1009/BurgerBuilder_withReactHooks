import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import Aux from "../../../hoc/Aux/Aux";
import { connect } from "react-redux";

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {props.isAuthenticated && props.name? (
        <Aux>
          <NavigationItem link="/profile" title="Profile">{props.name.split(' ')[0]}</NavigationItem>
          <NavigationItem link="/logout">Logout</NavigationItem>
        </Aux>
      ) : (
        <NavigationItem link="/auth">Login / Signup</NavigationItem>
      )}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.auth.userData.name,
  };
};

export default connect(mapStateToProps)(navigationItems);
