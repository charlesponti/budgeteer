
const localStorage = window.localStorage;
const $ = window.$;
let loggedIn;

export default {

  getAccessToken() {
    return this._accessToken;
  },

  authenticate() {
    return new Promise((resolve, reject) => {
      $.get('/user/loggedin', (response) => {
        if (response.accessToken) {
          this._accessToken = response.accessToken;
          localStorage.setItem('session.token', response.accessToken);
          resolve(response.accessToken);
        }
        reject();
      });
    });
  },

  loggedIn() {
    return localStorage.getItem('session.token');
  }
};
