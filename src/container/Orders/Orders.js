import React, { useEffect } from "react";
import { connect } from "react-redux";
import classes from "./Orders.css";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as orderAction from "../../store/actions/index";

const orders = (props) => {
  const { onFetchOrders } = props;

  useEffect(() => {
    onFetchOrders(props.userId);
  }, [onFetchOrders]);

  let orders = null;

  if (props.orders.length < 1) {
    orders = <p style={{ textAlign: "center" }}>No Orders Found!</p>;
  } else {
    orders = props.orders
      .slice()
      .reverse()
      .map((order) => (
        <Order
          delete={() => props.onOrderCancel(props.userId, order.orderId)}
          key={order.orderId}
          orderId={order.orderId}
          buyer={order.orderData.name}
          ingredients={order.ingredients}
          status={order.status}
          totalPrice={order.price}
        />
      ));
  }

  if (props.loading) {
    orders = <Spinner />;
  }

  return (
    <div className={classes.Orders}>
      <div className={classes.Heading}><h1>Orders</h1></div>
      <div className={classes.OrderList}>
        {orders}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (userId) => dispatch(orderAction.fetchOrders(userId)),
    onOrderCancel: (userId, orderId) =>
      dispatch(orderAction.orderCancel(userId, orderId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(orders, axios));
