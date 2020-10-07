import authReducer from './reducers/authReducer'
import toysReducer from './reducers/toysReducer'
import transactionsReducer from './reducers/transactionsReducer'
import categoriesReducer from './reducers/categoriesReducer'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import authChecker from '../middlewares/authChecker'

const store = createStore(
    combineReducers({
        auth: authReducer,
        toys: toysReducer,
        categories: categoriesReducer,
        transactions: transactionsReducer,
    }),
    applyMiddleware(authChecker, thunk)
)

export default store