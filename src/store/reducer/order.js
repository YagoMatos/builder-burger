import * as actionsTypes from '../actions/actionsTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const purchaseInit = (state, action) => {
  return updateObject(state, {purchased: false})
}

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, {loading: true})
}

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, {id: action.orderId})
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  })
}

const purchaseBurgerFail = (state, action) => {
  return updateObject(state, { loading: false})
}

const fetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true})
}

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  })
}

const fetchOrdersFail = (state, action) => {
  return updateObject(state, { loading: false})
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionsTypes.PURCHASE_INIT: return purchaseInit(state, action)
    case actionsTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action)
    case actionsTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
    case actionsTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action)
    case actionsTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action)
    case actionsTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
    case actionsTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action)
    default: return state;
  }
}

export default reducer;