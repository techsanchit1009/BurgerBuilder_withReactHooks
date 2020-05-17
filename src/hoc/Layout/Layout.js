import React, { useState } from "react";
import { connect } from 'react-redux';
import Aux from "../Aux/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const layout = props => {
  
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerShowHandler = () => {
    setShowSideDrawer(true);
  };
  
  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

    return (
      <Aux>
        <Toolbar 
            show={sideDrawerShowHandler}
            isAuth={props.isAuthenticated} />
        <SideDrawer
          open={showSideDrawer}
          closed={sideDrawerClosedHandler}
          isAuth={props.isAuthenticated}
        />
        <main className={classes.Content}>{props.children}</main>
      </Aux>
    );
}

const mapStateTpProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateTpProps)(layout);
