import auth from '../app/auth.js';

export default React.createClass({
  onButtonClick: function onFacebookButtonClick() {
    auth.login();
  },

  render: function onLogInRender() {
    const buttonStyle = {
      backgroundColor: '#1E3F5D',
      border: 'none',
      padding: '5px 17px',
      borderRadius: '3px',
      color: 'white'
    };

    return (
      <button style={buttonStyle}
              onClick={this.onButtonClick}>Log In With Facebook</button>
    );
  }
});
