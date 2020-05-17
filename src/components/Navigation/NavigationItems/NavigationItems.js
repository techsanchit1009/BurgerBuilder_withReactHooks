import React, { useEffect, useState } from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import Aux from "../../../hoc/Aux/Aux";
import { connect } from "react-redux";
import firebase from "../../../Firestore";

const navigationItems = (props) => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const db = firebase.firestore();
    if (props.userId) {
      db.collection("users")
        .doc(props.userId)
        .get()
        .then((snapshot) => setUserName(snapshot.data().name));
    }
  }, [props.userId]);

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {props.isAuthenticated && userName? (
        <Aux>
          <NavigationItem link="/profile" title="Profile">{userName.split(' ')[0]}</NavigationItem>
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
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(navigationItems);
