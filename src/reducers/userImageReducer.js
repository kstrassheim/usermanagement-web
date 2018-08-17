import initialState from './initialState';
import {GET_USER_IMAGE} from '../actions/actionTypes';

export default function login (state = initialState.userImage, action) {
  let newState;
  switch (action.type) {
    case GET_USER_IMAGE:
      newState = action.userImage;
      console.log(`${action.type} Action`)
      return newState;
    default:
      return state;
  }
}