import initialState from './initialState';
import {GET_USER} from '../actions/actionTypes';

export default function login (state = initialState.user, action) {
  let newState;
  switch (action.type) {
    case GET_USER:
      newState = action.user;
      console.log(`${action.type} Action`)
      return newState;
    default:
      return state;
  }
}