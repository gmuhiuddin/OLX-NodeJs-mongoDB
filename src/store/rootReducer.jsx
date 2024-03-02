import { combineReducers } from 'redux';
import UserInfoSlice from './userInfoSlice';

const rootReducer = combineReducers({
    userSlice: UserInfoSlice.reducer
});

export default rootReducer;