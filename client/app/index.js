'use strict'

var User = require('../models/user')

var App = {

  authenticated: false,

  initialData: {},

  init: function() {
    var userData;
    var dataNode = document.getElementById('initial-data')
    var userNode = document.getElementById('initial-user')

    if (dataNode) {
      this.initialData =
        dataNode.textContent && JSON.parse(dataNode.textContent)
      dataNode.remove()
    }

    if (userNode) {
      userData = userNode.textContent && JSON.parse(userNode.textContent)
      this.user = new User(userData)
      this.authenticated = true
      userNode.remove()
    }

    this.el = document.getElementById('app')

    return this
  },

  actions: require('./actions'),

  constants: require('./constants'),

  dispatcher: require('./dispatcher')

}

module.exports = App
