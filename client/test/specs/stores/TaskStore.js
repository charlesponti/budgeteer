'use strict';

var service = require('../../../app/service/api');
var TaskStore = require('../../../app/stores/TaskStore');
var TaskConstants = require('../../../app/constants/TaskConstants');
var expect = window.chai.expect;

describe('TaskStore', function() {

  var store, task, promise;

  beforeEach(function() {
    promise = Promise;
    task = { 
      title: 'foo', 
      description: 'bar', 
      completed: false, 
      category: 'default'
    };
    promise.resolve = promise.resolve.bind(promise, { tasks: [{_id: 1, title: 'foo'}] });
    promise.reject = promise.reject.bind(promise, { message: 'Error'});
    promise.then = sinon.stub().returns(promise);
    promise.catch = sinon.spy();
    store = TaskStore;
  });

  afterEach(function() {
    task = undefined;
    store = undefined;
  });

  describe('.load()', function() {
    it('should call service.get', function() {
      sinon.stub(service, 'get').returns(promise);
      store.load();
      expect(service.get.called).to.equal(true);
      expect(service.get.args[0]).to.deep.equal(['tasks']);
      expect(promise.then.called).to.equal(true);
    });
  });

  describe('.create()', function() {
    it('should call service.post', function() {
      sinon.stub(service, 'post').returns(promise);
      store.create(task);
      expect(service.post.called).to.equal(true);
      expect(service.post.args[0][0]).to.equal('tasks');
      expect(service.post.args[0][1]).to.deep.equal(task);
      expect(promise.then.called).to.equal(true);
    });
  });

  describe('.udpate()', function() {
    it('should call service.put', function() {
      sinon.stub(service, 'put').returns(promise);
      store.update(task);
      expect(service.put.called).to.equal(true);
      expect(service.put.args[0][0]).to.equal('tasks');
      expect(service.put.args[0][1]).to.deep.equal(task);
      expect(promise.then.called).to.equal(true);
    });
  });

  describe('.destroy()', function() {
    it('should call service.del', function() {
      sinon.stub(service, 'del').returns(promise);
      store.destroy(task);
      expect(service.del.called).to.equal(true);
      expect(service.del.args[0][0]).to.equal('tasks');
      expect(service.del.args[0][1]).to.deep.equal(task);
      expect(promise.then.called).to.equal(true);
    });
  });

  describe('.eventHandler()', function() {
    it('should call store.create on CREATE', function() {
      store.create = sinon.spy();
      store.eventHandler({ action: TaskConstants.CREATE, data: 'foo' });
      expect(store.create.called).to.equal(true);
      expect(store.create.args[0][0]).to.equal('foo');
    });
    it('should call store.update on UPDATE', function() {
      store.update = sinon.spy();
      store.eventHandler({ action: TaskConstants.UPDATE, data: 'foo' });
      expect(store.update.called).to.equal(true);
      expect(store.update.args[0][0]).to.equal('foo');
    });
    it('should call store.destroy on DESTROY', function() {
      store.destroy = sinon.spy();
      store.eventHandler({ action: TaskConstants.DESTROY, data: 'foo' });
      expect(store.destroy.called).to.equal(true);
      expect(store.destroy.args[0][0]).to.equal('foo');
    });
  });

  describe('.dispatch()', function() {
    it('should call store.create on CREATE', function() {
      store.create = sinon.spy();
      store.dispatch({ action: TaskConstants.CREATE, data: 'foo' });
      expect(store.create.called).to.equal(true);
      expect(store.create.args[0][0]).to.equal('foo');
    });
    it('should call store.update on UPDATE', function() {
      store.update = sinon.spy();
      store.dispatch({ action: TaskConstants.UPDATE, data: 'foo' });
      expect(store.update.called).to.equal(true);
      expect(store.update.args[0][0]).to.equal('foo');
    });
    it('should call store.destroy on DESTROY', function() {
      store.destroy = sinon.spy();
      store.dispatch({ action: TaskConstants.DESTROY, data: 'foo' });
      expect(store.destroy.called).to.equal(true);
      expect(store.destroy.args[0][0]).to.equal('foo');
    });
  });

  describe('.register()', function() {
    var newDispatch;

    beforeEach(function() {
      newDispatch = sinon.stub();
      store.register(newDispatch);
    });

    it('should call newDispatch', function() {
      store.dispatch({ payload: 'foo', data: 'bar' });
      expect(newDispatch.called).to.equal(true);
      expect(newDispatch.args[0][0].payload).to.equal('foo');
      expect(newDispatch.args[0][0].data).to.equal('bar');
    });
  });

});
