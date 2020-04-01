import React, { Component } from "react";
import { connect } from 'react-redux';
import Aux from "../Aux/Aux";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerShowHandlrer = () => {
    this.setState({ showSideDrawer: true });
  };
  
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  render() {
    return (
      <Aux>
        <Toolbar 
            show={this.sideDrawerShowHandlrer}
            isAuth={this.props.isAuthenticated} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuth={this.props.isAuthenticated}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateTpProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateTpProps)(Layout);
