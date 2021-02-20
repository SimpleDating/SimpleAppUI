import {combineReducers} from 'redux';
import streamSlice from 'store/slices/streamSlice';
import authReducer from './../slices/authSlice';

const rootReducer = combineReducers({auth: authReducer, stream: streamSlice});

export default rootReducer;
