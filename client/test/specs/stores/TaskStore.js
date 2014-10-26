'use strict';

var service = require('../../../app/service/api');
var TaskStore = require('../../../app/stores/TaskStore');
var expect = window.chai.expect;

describe('TaskStore', function() {

  var store, task;

  var newPromise = function() {
    return new Promise(function() {});
  };

  beforeEach(function() {
    task = { 
      title: 'foo', 
      description: 'bar', 
      completed: false, 
      category: 'default'
    };
    store = _.merge({}, TaskStore);
  });

  afterEach(function() {
    task = undefined;
    store = undefined;
  });

  describe('.load()', function() {
    it('should call service.get', function() {
      sinon.stub(service, 'get', newPromise);
      store.load();
      expect(service.get.called).to.equal(true);
      expect(service.get.args[0]).to.deep.equal(['tasks']);
    });
  });

  describe('.create()', function() {
    it('should call service.post', function() {
      sinon.stub(service, 'post', newPromise);
      store.create(task);
      expect(service.post.called).to.equal(true);
      expect(service.post.args[0][0]).to.equal('tasks');
      expect(service.post.args[0][1]).to.deep.equal(task);
    });
  });

  describe('.udpate()', function() {
    it('should call service.put', function() {
      sinon.stub(service, 'put', newPromise);
      store.update(task);
      expect(service.put.called).to.equal(true);
      expect(service.put.args[0][0]).to.equal('tasks');
      expect(service.put.args[0][1]).to.deep.equal(task);
    });
  });

  describe('.destroy()', function() {
    it('should call service.del', function() {
      sinon.stub(service, 'del', newPromise);
      store.destroy(task);
      expect(service.del.called).to.equal(true);
      expect(service.del.args[0][0]).to.equal('tasks');
      expect(service.del.args[0][1]).to.deep.equal(task);
    });
  });
});
