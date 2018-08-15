import initialState from './initialState';
import {RECEIVE_TOKEN} from '../actions/actionTypes';

export default function login (state = initialState.login, action) {
  let newState;
  switch (action.type) {
    case RECEIVE_TOKEN:
      newState = action.login;
      console.log(`${action.type} Action`)
      return newState;
    default:
      return state;
  }
}