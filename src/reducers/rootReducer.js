import {combineReducers} from 'redux';
import login from './loginReducer';
import user from './userReducer';
import userImage from './userImageReducer';

const rootReducer = combineReducers({
  login,
  user,
  userImage
});

export default rootReducer;