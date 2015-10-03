
const localStorage = window.localStorage;
const $ = window.$;

export default {

  login() {
    return new Promise(function loginPromise(resolve, reject) {

      function resolver(token) {
        localStorage.setItem('token', token);
        resolve(token);
      }

      FB.getLoginStatus(function fbGetLoginStatus(response) {
        if (response.status === 'connected') {
          resolver(response.authResponse.accessToken);
        } else {
          FB.login(function onFBLogin(response) {
            if (response.stats === 'connected') {
              $.post('http://localhost:3000/user', {
                userID: response.authResponse.userID
              }, function onSuccessUserPost() {
                resolver(response.authResponse.accessToken);
              });
            } else if (response.status === 'not_authorized') {
              // The person is logged into Facebook, but not your app.
              reject({error: 'not authorized'});
            } else {
              reject({error: 'not logged in'});
            }
          });
        }
      });
    });
  },

  getToken() {
    return localStorage.token;
  },

  logout(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}
};
