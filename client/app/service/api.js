'use strict';

var _ = require('lodash');

function APIService(newService) {

  var service = {};

  service.getCSRF = function() {
    return $('#csrf').data('value');
  };

  /**
   * Make AJAX request to `/api`
   * @param  {Object} options
   * @param  {String} options.path
   * @param  {String} options.method
   * @param  {Object} options.data
   * @return {jQuery.Deferred}
   */
  service.request = function apiRequest(options) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/api/'+options.path,
        method: options.method,
        data: options.data || {}
      })
      .done(function(data) {
        resolve(data);
      })
      .fail(function(data) {
        reject(data);
      });
    });
  };

  /**
   * Make GET request to `/api`
   * @param  {String} path
   * @param  {Object} data
   * @return {jQuery.Deferred}
   */
  service.get = function(path, data) {
    return service.request({ path: path, method: 'GET', data: data });
  };

  /**
   * Make POST request to `/api`
   * @param  {String} path
   * @param  {Object} data
   * @return {jQuery.Deferred}
   */
  service.post = function(path, data) {
    data = data || {};
    data._csrf = $('#csrf').data('value');
    return service.request({ path: path, method: 'DELETE', data: data });
  };

  /**
   * Make PUT request to `/api`
   * @param  {String} path
   * @param  {Object} data
   * @return {jQuery.Deferred}
   */
  service.put = function(path, data) {
    data = data || {};
    data._csrf = service.getCSRF();
    return service.request({ path: path, method: 'PUT', data: data });
  };

  /**
   * Make PATCH request to `/api`
   * @param  {String} path
   * @param  {Object} data
   * @return {jQuery.Deferred}
   */
  service.patch = function(path, data) {
    data = data || {};
    data._csrf = service.getCSRF();
    return service.request({ path: path, method: 'PATCH', data: data });
  };

  /**
   * Make DELETE request to `/api`
   * @param  {String} path
   * @param  {Object} data
   * @return {jQuery.Deferred}
   */
  service.del = function(path, data, callback) {
    data = data || {};
    data._csrf = service.getCSRF();
    return service.request({ path: path, method: 'DELETE', data: data });
  };

  if (_.isPlainObject(newService)) {
    service = _.extend(service, newService);
  }

  return service;

}

module.exports = APIService();
