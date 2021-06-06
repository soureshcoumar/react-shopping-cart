import { createStore, applyMiddleware,compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { productReducer } from './reducers/productReducers'
import {cartReducer } from './reducers/cartReducers'

const initialState = {}
const enhancers = [applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()];

const store = createStore(combineReducers({
    products: productReducer,
    cart:cartReducer,
}),initialState, compose(...enhancers))

export default store