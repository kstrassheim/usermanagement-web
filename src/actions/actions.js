import * as types from './actionTypes';

var authServer = 'https://nodeauthweb.azurewebsites.net'
var userServer = 'https://usermanagement-api.azurewebsites.net';
//var userServer = 'https://localhost:5001';

export function saveToken(token) {
    return {type: types.SAVE_TOKEN, login: {token: token}};
}

export function getUser() {
    return async (dispatch, getState) => {
        try {
            const { login } = getState();
            const params = {access_token:login.token};
            const searchParams = Object.keys(params).map((key) => {return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]); }).join('&');
            const result = await fetch(`${authServer}/auth/validate`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body:searchParams
            });
            const data = await result.json();
            if (!data) throw 'Token is not valid';
            dispatch({type: types.GET_USER, user: data}); 
        }
        catch(err) {
            console.error(err);
        }
    }
}

export function getUserImage() {
    return async (dispatch, getState) => {
        try {
            const { login } = getState();
            const result = await fetch(`${userServer}/api/UserImage`, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials:'include',
                headers: {'authorization': login.token}
            });
            let data = await result.blob();
            let image = URL.createObjectURL(data);
            dispatch({type: types.GET_USER_IMAGE, userImage: image}); 
        }
        catch(err) {
            console.error(err);
        }
    }
}

export function uploadUserImage(file) {
    return async (dispatch, getState) => {
        try {
            const { login } = getState();
            const formData = new FormData();
            formData.append('file',file)
            const result = await fetch(`${userServer}/api/UserImage`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials:'include',
                headers: {'authorization': login.token },
                body:formData
            });
            let data = await result.text();
            let status = result.statusText;
            console.log(`Upload status ${status}`);
            dispatch({type: types.UPLOAD_USER_IMAGE}); 
            getUserImage()(dispatch, getState);
        }
        catch(err) {
            console.error(err);
        }
    }
}