// import {authHeader} from '@/_helpers/auth-header'
import queryString from 'querystring'

class RequestService {
    token;
    base_url;

    constructor() {
        // const user = JSON.parse(localStorage.getItem('user'));
    }

    get(path, parameters, customHeaders = {}) {
        const params = queryString.stringify(parameters);
        const target = path + '?' + params;
        let requestOptions = {
            method: 'GET',
            headers: this.authHeader()
        };
        // console.log("requestOptions=>",requestOptions)

        //Si manda custom header lo reemplazo
        if (Object.keys(customHeaders).length) requestOptions.headers = customHeaders;

        return this.request('get', target, requestOptions);
    }

    post(path, data, customHeaders = {}) {
        const target = path;
        let requestOptions = {
            method: 'POST',
            headers: this.authHeader(),
            body: JSON.stringify(data)
        };
        console.log(data);
        console.log("requestOptions=>", requestOptions);
        //console.log("requestOptions=>",requestOptions)
        // console.log(this.authHeader());
        //Si manda custom header lo reemplazo
        if (Object.keys(customHeaders).length) requestOptions.headers = customHeaders;
        return this.request('post', target, requestOptions);
    }

    delete(path, data, customHeaders = {}) {
        const target = path;
        let requestOptions = {
            method: 'delete',
            headers: this.authHeader(),
            body: JSON.stringify(data)
        };
        console.log(data);
        console.log("requestOptions=>", requestOptions);
        //console.log("requestOptions=>",requestOptions)
        // console.log(this.authHeader());
        //Si manda custom header lo reemplazo
        if (Object.keys(customHeaders).length) requestOptions.headers = customHeaders;
        return this.request('delete', target, requestOptions);
    }

    put(path, data, customHeaders = {}) {
        const target = path;
        let requestOptions = {
            method: 'PUT',
            headers: this.authHeader(),
            body: JSON.stringify(data)
        };
        console.log(data);
        console.log("requestOptions=>", requestOptions);
        //console.log("requestOptions=>",requestOptions)
        // console.log(this.authHeader());
        //Si manda custom header lo reemplazo
        if (Object.keys(customHeaders).length) requestOptions.headers = customHeaders;
        return this.request('put', target, requestOptions);
    }

    patch() {

    }

    authHeader() {
        // return authorization header with jwt token;
        if (this.token) {
            return {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token,
            };
        } else {
            return {
                'Authorization': '',
                'Content-Type': 'application/json'
            };
        }
    }

    request(method, path, options) {
        const target = this.base_url + path;
        return fetch(target, options)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success) {
                    return responseJson
                } else {
                    return this.handleError(responseJson)
                }
            })
            .catch((error) => {
                console.log('CATCHED ERROR EN REQUEST');
                console.log(error);
                return error
            })
    }

    handleResponse(response) {
        console.log('ENTRÓ A RESPONSE');
        console.log(response.json());
        return response.json();
        // return response.then(text => {
        //     const data = text && JSON.parse(text);
        //     if (!response.ok) {
        //         if (response.status !== 200 || response.status !== 202) {
        //             // logout();
        //             // location.reload(true);
        //         }
        //         if (response.status === 403) { //Status 403 significa que el token venció
        //             this.logout();
        //         }
        //         const error = (data && data.message) || response.statusText;
        //         return Promise.reject(error);
        //     }
        //     return data;
        // });
    }

    handleError(response) {
        if (response.code === 401) {
            window.location.href = '/login'
        }
        return response
    }

    logout() {
        // eslint-disable-next-line no-console
        console.log('LOGOUT')
    }

    setToken(token) {
        token = token.replace('"', '');
        this.token = token;
    }

    setupClient(base_url) {
        this.base_url = base_url;
    }
}

export const requestService = new RequestService();
