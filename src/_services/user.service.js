import {requestService} from '@/_helpers/base.service';

export const userService = {
    login,
    getUserSession,
    logout,
};

function login(email, password) {
    // return requestService.post('/oauth/login', {email: email, password: password})

    //PUT HERE API CALL
    return new Promise((resolve) => {
        resolve({
            'success': true,
            'data': {
                'email': email,
                'access_token': password
            }
        });
    })
}

function getUserSession() {
    return requestService.get('/user');
}

function logout() {
    localStorage.removeItem('user');
}
