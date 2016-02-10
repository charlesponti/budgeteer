import React from 'react';
import auth from '../app/auth';

export default class Login extends React.Component {

  onButtonClick() {
    auth.login();
  }

  render() {
    const buttonStyle = {
      backgroundColor: '#1E3F5D',
      border: 'none',
      padding: '5px 17px',
      borderRadius: '3px',
      color: 'white'
    };

    return (
      <button
        style={buttonStyle}
        onClick={this.onButtonClick}
      >
        <a href="/auth/facebook">Log In With Facebook</a>
      </button>
    );
  }

}
