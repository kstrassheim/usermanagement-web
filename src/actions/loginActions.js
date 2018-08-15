import * as types from './actionTypes';

export function receiveToken(token) {
  return {type: types.RECEIVE_TOKEN, login: {token: token}};
}