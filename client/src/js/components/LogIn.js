import React from 'react';
import firebaseUtils from '../utils/firebase';

export default class Login extends React.Component {

  onButtonClick() {
    firebaseUtils.login();
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
        Log In With Facebook
      </button>
    );
  }

}
