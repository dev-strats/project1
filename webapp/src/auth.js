import * as config from './config';

class Auth {

    /**
     * Fake data
     *
     */
    static authenticateCheckUser(data) {
        let get_data = this.getListUser() || [];
        if(get_data.length > 0){
            let check_user = get_data.filter((v, k) => {
                return v.email === data.email;
            });
            if(check_user.length > 0){
                if(check_user[0].password !== data.password){
                    return new Promise(function(resolve, reject) {resolve({ 'status': 0, 'error': 'Invalid email or password' }) })
                }else{
                    let res_data = {
                        'first_name': check_user[0].first_name,
                        'last_name': check_user[0].last_name,
                        'email': check_user[0].email,
                        'id': check_user[0].id,
                        'token': check_user[0].token,
                    }
                    return new Promise(function(resolve, reject) {resolve({ 'status': 1, 'data': res_data }) })
                }
            }else{
                return new Promise(function(resolve, reject) {resolve({ 'status': 0, 'error': 'Invalid email or password' }) })
            }
        }else{
            return new Promise(function(resolve, reject) {resolve({ 'status': 0, 'error': 'Invalid email or password' }) })
        }
        return new Promise(function(resolve, reject) {resolve({ 'status': 0, 'error': 'Server Error' }) })
    }
    static authenticateForgotPassword(data) {
        let get_data = this.getListUser() || [];
        if(get_data.length > 0){
            let check_user = get_data.filter((v, k) => {
                return v.email === data.email;
            });
            if(check_user.length > 0){
                return new Promise(function(resolve, reject) {resolve({ 'status': 1, 'success': 'Please check your email' }) })
            }else{
                return new Promise(function(resolve, reject) {resolve({ 'status': 0, 'error': 'Invalid email' }) })
            }
        }
        return new Promise(function(resolve, reject) {resolve({ 'status': 0, 'error': 'Server Error' }) })
    }
    static authenticateAddListUser(data) {
        let get_data = this.getListUser() || [];
        data.id = get_data.length + 1;
        data.token = Math.random().toString(36).substr(2);
        if(get_data.length > 0){
            let check_user = get_data.filter((v, k) => {
                return v.email === data.email;
            });
            if(check_user.length > 0){
                return new Promise(function(resolve, reject) {resolve({ 'status': 0, 'error': 'Email exists' }) })
            }
        }
        get_data.push(data);
        localStorage.setItem(config.LIST_USER, JSON.stringify(get_data));
        return new Promise(function(resolve, reject) {resolve({'status': 1}) })
    }
    static getListUser() {
        return JSON.parse(localStorage.getItem(config.LIST_USER));
    }





    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
    static authenticateUser(data) {
        localStorage.setItem(config.CURRENT_USER, JSON.stringify(data));
    }

    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
        return localStorage.getItem(config.CURRENT_USER) !== null;
    }

    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deauthenticateUser() {
        localStorage.removeItem(config.CURRENT_USER);
    }

    /**
     * Get a token value.
     *
     * @returns {string}
     */

    static getToken() {
        let data = this.getData();
        return data ? data.token : null;
    }

    static getFullName() {
        let data = this.getData();
        return data ? data.first_name + ' ' + data.last_name : null;
    }

    static getData() {
        return JSON.parse(localStorage.getItem(config.CURRENT_USER));
    }


}

export default Auth;