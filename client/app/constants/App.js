'use strict';

var keyMirror = require('react/lib/keyMirror');

module.exports = keyMirror({

  // Task actions
  TASK_EDIT: null,
  TASK_CREATE: null,
  TASK_UPDATE: null,
  TASK_DESTROY: null,
  TASK_SUBMIT_FORM: null,

  // Category actions
  CATEGORY_EDIT: null,
  CATEGORY_CREATE: null,
  CATEGORY_UPDATE: null,
  CATEGORY_DESTROY: null,
  CATEGORY_SUBMIT_FORM: null,
  
  // User actions
  USER_LOADED: null,

  // Modal actions
  SHOW_MODAL: null,
  CLOSE_MODAL: null

});
