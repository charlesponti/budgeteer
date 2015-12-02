import auth from '../app/auth.js';

export default React.createClass({
  render: function onLogInRender() {
    const buttonStyle = {
      backgroundColor: '#1E3F5D',
      padding: '5px 17px',
      borderRadius: '3px',
      color: 'white'
    };

    return (
      <a href="/auth/facebook" style={buttonStyle}>
        Log In With Facebook
      </a>
    );
  }
});
