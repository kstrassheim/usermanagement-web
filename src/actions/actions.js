import * as types from './actionTypes';

export function saveToken(token) {
    return {type: types.SAVE_TOKEN, login: {token: token}};
}

export function getUser(token) {
    return async (dispatch) => {
        const params = {access_token:token};
        const searchParams = Object.keys(params).map((key) => {return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]); }).join('&');
        let a = 0;
        const result = await fetch('https://nodeauthweb.azurewebsites.net/auth/validate', {
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