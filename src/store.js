import { createStore, applyMiddleware,compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { productReducer } from './reducers/productReducers'

const initialState = {}
const enhancers = [applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()];

const store = createStore(combineReducers({
    products:productReducer,
}),initialState, compose(...enhancers))

export default store