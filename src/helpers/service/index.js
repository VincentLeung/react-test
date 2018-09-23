export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                doLogout();
                // location.reload(true);
            }

            // const error = (data && data.errorCode) || response.statusText;
            const error = data;
            return Promise.reject(error);
        }

        return data;
    });
}

export function doLogout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
