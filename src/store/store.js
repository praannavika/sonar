import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import creditCardReducer from '../reducers/creditCardReducer';
import loadingReducer from '../reducers/loadingReducer';

const store = createStore(
    combineReducers({
        authReducer,
        creditCardReducer,
        loadingReducer
    }),
    applyMiddleware(
        thunk,
        logger
    )
)

export default store;