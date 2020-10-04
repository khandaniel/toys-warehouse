import authReducer from './reducers/authReducer'
import productReducer from './reducers/productReducer'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

const store = createStore(
    combineReducers({
        auth: authReducer,
        products: productReducer
    }),
    applyMiddleware(thunk)
)

export default store