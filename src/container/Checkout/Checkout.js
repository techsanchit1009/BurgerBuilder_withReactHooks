import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ContactDetails from "./ContactDetails/ContactDetails";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-details");
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  render() {
    let checkoutSummary = <Redirect to="/" />
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      checkoutSummary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />  
          <Route
            path={this.props.match.path + "/contact-details"}
            component={ContactDetails}
          />
        </div>
      );
    }

    return checkoutSummary ;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
