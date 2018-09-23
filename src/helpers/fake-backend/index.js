import currentUser from './currentUser.json';

export function configureFakeBackend() {
    let users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/auth/login') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            username: 'test@test.com',
                            authToken: 'fake-jwt-token'
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        // reject('Username or password is incorrect');
                        let responseJson = {
                            errorCode: 'ACCESS_DENIED'
                        };
                        resolve({ ok: false, status: 401, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    }

                    return;
                }

                // get users
                if (url.endsWith('/auth/currentUser') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    // if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                    if (opts.headers && opts.headers.Authorization) {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(currentUser))});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}
