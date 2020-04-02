import React, { useEffect } from "react";
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as orderAction from '../../store/actions/index';

const orders = props => {

  const {onFetchOrders} = props;

  useEffect(() => {
    onFetchOrders(props.token, props.userId); 
  }, [onFetchOrders]);


    let orders = null;
    
    if(props.orders.length < 1){
      orders = <p style={{textAlign: 'center'}}>No Orders Present</p>;
    } else{
      orders = props.orders.map(order => (
        <Order
             delete={() => props.onOrderDelete(order.id)} 
             key={order.id}
             buyer={order.orderData.name}
             ingredients={order.ingredients}
             totalPrice={order.price}/>
      ))
    }

    if(props.loading){
      orders = <Spinner />;
    }

    return (
      <div>
      {orders}
      </div>
    );
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders : (token, userId) => dispatch(orderAction.fetchOrders(token, userId)),
    onOrderDelete: (id) => dispatch(orderAction.orderDelete(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));