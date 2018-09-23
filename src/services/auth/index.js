import config from 'config';
import { authHeader, handleResponse, doLogout } from 'helpers';

export const authService = {
    login,
    logout,
    currentUser
};

function login(username, password, otp) {
    const otpType = 'TIME_BASED_OTP';
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, otpType, otp })
    };
    return fetch(`${config.apiUrl}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.authToken) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    doLogout();
}

function currentUser() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/auth/currentUser`, requestOptions).then(handleResponse);
}
