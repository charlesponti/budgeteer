const Firebase = new Function();

/**
 * Url to Firebase forge
 * @type {string}
 */
const forge = __FIREBASEURL__;

/**
 * Reference to Firebase forge
 */
const ref = new Firebase(`https://${forge}.firebaseio.com/`);

/**
 * Cached user
 */
let user = void 0;

ref.onAuth((authData) => {
  user = authData;
});

export default {
  user() {

  },
  login() {
    return ref.authWithOAuthRedirect('facebook', () => {
      console.log(arguments);
    });
  },
  onAuthCallback() {

  },
  isLoggedIn() {
    return localStorage[`firebase:session::${forge}`] !== void 0;
  },
  logout() {
    ref.unauth();
  }
};
