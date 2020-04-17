import {userService} from '../_services';
import {router} from '../_helpers/router';
import {requestService} from "../_helpers/base.service";
const user = localStorage.getItem('user');

const state = {
    status: {},
    user: JSON.parse(user),
    afterLogin: null
};

const actions = {
    async login({commit}, {email, password}) {
        commit('loginRequest', {email});
        const user = await userService.login(email, password);
        if(user.success) {
            commit('loginSuccess', user.data);
            await router.push('/');
            location.reload();
        } else {
            commit('loginError', user.data);
        }
        return user.data;

    },
    logout({commit}) {
        userService.logout();
        commit('logout');
    },
    register({dispatch, commit}, user) {
        commit('registerRequest', user);

        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', {root: true});
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, {root: true});
                }
            );
    }
};

const mutations = {
    loginRequest(state, user) {
        state.status = {loggingIn: true};
        state.user = user;
    },
    loginSuccess(state, user) {
        if (user.access_token) {
            state.status = {loggedIn: true};
            localStorage.setItem('user', JSON.stringify(user));
            requestService.setToken(user.access_token);
            state.user = user;
        }
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state) {
        state.status = {registering: true};
    },
    registerSuccess(state) {
        state.status = {};
    },
    registerFailure(state) {
        state.status = {};
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
