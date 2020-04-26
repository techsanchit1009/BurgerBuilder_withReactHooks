import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      }

    case actionTypes.PURCHASE_BURGER_START:
      return{
        ...state,
        loading: true,
      };
      
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        id: action.orderId,
        status: 'pending',
        ...action.orderData,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
      };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionTypes.FETCH_ORDERS_START:
      return{
        ...state,
        loading: true
      };

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return{
        ...state,
        orders: action.orders,
        loading: false
      };

    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false
      };
    
    case actionTypes.ORDER_CANCEL_START:
      return {
        ...state,
        loading: true
      }

    case actionTypes.ORDER_CANCEL_SUCCESS:
      const index = state.orders.findIndex(order => order.orderId === action.orderId );
      const updatedIndex = {
        ...state.orders[index],
        status: 'cancelled'
      }
      state.orders[index] = updatedIndex;
      return {
        ...state, 
        loading: false
      };

    default:
      return state;
  }
};



export default reducer;