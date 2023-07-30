// src/store/reducers.ts

import {combineReducers} from 'redux';

// Define the Order type
export interface Order {
  id: string;
  customerName: string;
  phoneNumber: number;
  tableId: string;
  dishes: string[];
  isCompleted: boolean;
  orderStatus: string;
}

// Define the OrdersState interface
export interface OrdersState {
  orders: Order[];
}

const initialOrdersState: OrdersState = {
  orders: [],
};

// Action Types
const ADD_ORDER = 'ADD_ORDER';
const COMPLETE_ORDER = 'COMPLETE_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';
const SET_FORM_DATA = 'SET_FORM_DATA';

// Action Creators
export const addOrder = (order: Order) => ({
  type: ADD_ORDER,
  payload: order,
});

export const completeOrder = (orderId: string) => ({
  type: COMPLETE_ORDER,
  payload: orderId,
});

export const deleteOrder = (orderId: string) => ({
  type: DELETE_ORDER,
  payload: orderId,
});

export const setFormData = (formData: Partial<Order>) => ({
  type: SET_FORM_DATA,
  payload: formData,
});

// Orders Reducer
function ordersReducer(state = initialOrdersState, action: any) {
  switch (action.type) {
    case ADD_ORDER:
      return {...state, orders: [...state.orders, action.payload]};
    case COMPLETE_ORDER:
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload
            ? {...order, isCompleted: true, orderStatus: 'Completed'}
            : order,
        ),
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload),
      };
    default:
      return state;
  }
}

function formDataReducer(state: Partial<Order> = {}, action: any) {
  switch (action.type) {
    case SET_FORM_DATA:
      return {...state, ...action.payload};
    default:
      return state;
  }
}

// Root Reducer
const rootReducer = combineReducers({
  orders: ordersReducer,
  formData: formDataReducer, 
  // Add more reducers here if needed
});

export default rootReducer;
