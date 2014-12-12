'use strict';

var _ = require('lodash');
var BaseStore = require('../../../app/stores/BaseStore');

describe('BaseStore', function() {

  var store;

  beforeEach(function() {
    store = _.merge({}, BaseStore);
  });

  afterEach(function() {
    store = undefined;
  });

  describe('.add()', function() {
    it('should add record to store', function() {
      expect(store._records).toEqual([]);
      store.add({ foo: 'bar' });
      var records = store._records;
      expect(records.length).toEqual(1);
      expect(records[0].foo).toEqual('bar');
    });
    it('should add array of records to store', function() {
      store._records = [{ bar: 'bar'}];
      expect(store._records.length).toEqual(1);
      store.add({ foo: 'bar' });
      expect(store._records.length).toEqual(2);
    });
    it('should throw error if you try to add string', function() {
      expect(store.add.bind(store, 'foo'))
        .toThrow(new Error('BaseStore#add only takes an object or an array of objects'));
    });
    it('should throw error if you try to add array of strings', function() {
      expect(store.add.bind(store, ['foo', 'bar']))
        .toThrow(new Error('BaseStore#add only takes an object or an array of objects'));
    });
    it('should throw error if you try to add number', function() {
      expect(store.add.bind(store, 5))
        .toThrow(new Error('BaseStore#add only takes an object or an array of objects'));
    });
    it('should throw error if you try to add array of numbers', function() {
      expect(store.add.bind(store, [5, 6]))
        .toThrow(new Error('BaseStore#add only takes an object or an array of objects'));
    });
    it('should throw error if you try to add array of unaccepted values', function() {
      expect(store.add.bind(store, [5, 'foo', true]))
        .toThrow(new Error('BaseStore#add only takes an object or an array of objects'));
    });
  });

  describe('.remove()', function() {
    it('should remove a records from store', function() {
      store.add({ _id: 1, foo: 'bar' });
      expect(store._records.length).toEqual(1);
      store.remove(1);
      expect(store._records.length).toEqual(0);
    });
  });

  describe('.getRecords()', function() {
    it('should return records', function() {
      store.add({ _id: 1, foo: 'bar' });
      expect(store.getRecords())
        .toEqual([{ _id: 1, foo: 'bar' }]);
    });
  });

  describe('.updateRecord', function() {
    it('should update record', function() {
      store.add({ _id: 1, foo: 'bar' });
      expect(store._records[0].foo).toEqual('bar');
      store.updateRecord({ _id: 1, foo: 'baz'});
      expect(store._records[0].foo).toEqual('baz');
    });
  });
});
