import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ContactDetails from "./ContactDetails/ContactDetails";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

const checkout = props => {
  const checkoutContinuedHandler = () => {
    props.history.replace("/checkout/contact-details");
  };

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  let checkoutSummary = <Redirect to="/" />;
  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    checkoutSummary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route
          path={props.match.path + "/contact-details"}
          component={ContactDetails}
        />
      </div>
    );
  }

  return checkoutSummary;
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(checkout);
