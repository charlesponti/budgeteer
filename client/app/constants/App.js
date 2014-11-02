'use strict';

var keyMirror = require('react/lib/keyMirror');

module.exports = keyMirror({

  // Task actions
  TASK_CREATE: null,
  TASK_CREATED: null,
  TASK_UPDATE: null,
  TASK_UPDATED: null,
  TASK_DESTROY: null,
  TASK_DESTROYED: null,
  TASK_EDIT: null,
  TASK_COMPLETED: null,
  TASK_LOADED: null,
  TASK_SUBMIT: null,
  TASK_UPDATE_EXISTING: null,
  TASK_CREATE_NEW: null,
  
  // User actions
  USER_LOADED: null

});
