import * as actionTypes from './actionTypes';
import axios from 'axios';

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
    axios.post(`http://localhost:5000/orders/${userId}`, orderData)
        .then(resp => {
          dispatch(checkout(userId, orderData));
          // dispatch(purchaseBurgerSuccess(orderData.orderId, orderData));
        })
  }
};

export const checkout = (userId, orderData) => {
  return dispatch => {
    const orderDetails = {
      userId,
      orderData
    };
    axios.post('http://localhost:5000/checkout', orderDetails)
        .then(resp => {
          window.location.replace(resp.data.redirectLink);
        })
  }
}

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
    dispatch(fetchOrdersStart());
    axios.get(`http://localhost:5000/orders/${userId}`)
          .then(resp => {
            dispatch(fetchOrdersSuccess(resp.data))
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
    axios.patch(`http://localhost:5000/orders/${userId}/${orderId}`)
          .then(resp => {
            dispatch(orderCancelSuccess(orderId));
          });
  }
}

export const orderCancelSuccess = (id) => {
  return {
    type: actionTypes.ORDER_CANCEL_SUCCESS,
    orderId: id
  }
}