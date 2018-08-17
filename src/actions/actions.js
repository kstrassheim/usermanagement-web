import * as types from './actionTypes';

var authServer = 'https://nodeauthweb.azurewebsites.net'
var userServer = 'https://usermanagement-api.azurewebsites.net';
//var userServer = 'https://localhost:5001';

export function saveToken(token) {
    return {type: types.SAVE_TOKEN, login: {token: token}};
}

export function getUserImage(token) {
    return async (dispatch) => {
        const result = await fetch(`${userServer}/api/UserImage`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials:'include',
            headers: { 
                'authorization': token, 
            }
        });
        let data = await result.blob();
        let image = URL.createObjectURL(data);
        if (!data) throw 'Token is not valid';
        dispatch({type: types.GET_USER_IMAGE, userImage: image}); 
    }
}

export function getUser(token) {
    return async (dispatch) => {
        const params = {access_token:token};
        const searchParams = Object.keys(params).map((key) => {return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]); }).join('&');
        const result = await fetch(`${authServer}/auth/validate`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin': '*' },
            body:searchParams
        });
        const data = await result.json();
        if (!data) throw 'Token is not valid';
        dispatch({type: types.GET_USER, user: data}); 
    }
}