import * as actionTypes from './actionTypes';
import firebase from '../../Firestore';

const db = firebase.firestore();

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
};

export const purchaseBurger = (orderData, userId) => {
  return dispatch => {
    orderData = {
      ...orderData,
      status: 'pending'
    }
    dispatch(purchaseBurgerStart());
    db.collection('users').doc(userId)
      .collection('orders').doc(orderData.orderId)
      .set(orderData)
      .then(() => {
        dispatch(purchaseBurgerSuccess(orderData.orderId, orderData));
        alert("Order Placed Successfully");
      });
  }
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = (userId) => {
  return dispatch => {
    const ordersArray = [];
    // console.log('orders:', orders);
    dispatch(fetchOrdersStart());
    db.collection('users').doc(userId).collection('orders').get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            ordersArray.push(doc.data());
          });
          dispatch(fetchOrdersSuccess(ordersArray));
        });
  };
};

export const orderCancelStart = () => {
  return {
    type: actionTypes.ORDER_CANCEL_START
  };
};

export const orderCancel = (userId, orderId) => {
  return dispatch => {
    dispatch(orderCancelStart());
    db.collection('users').doc(userId).collection('orders').doc(orderId)
        .update({
          status: 'cancelled'
        }).then(() => {
          console.log('order cancelled successfully');
          dispatch(orderCancelSuccess(orderId));
        })
  }
}

export const orderCancelSuccess = (id) => {
  return {
    type: actionTypes.ORDER_CANCEL_SUCCESS,
    orderId: id
  }
}