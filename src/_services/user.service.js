import {requestService} from '@/_helpers/base.service';

export const userService = {
    login,
    getUserSession,
    logout,
};

function login(email, password) {
    return requestService.post('/oauth/login', {email: email, password: password});
}

function getUserSession() {
    return requestService.get('/user');
}

function logout() {
    localStorage.removeItem('user');
}
