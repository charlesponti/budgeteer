'use strict';

describe('User', function() {

  require('../../server');

  var user, oauth;

  beforeEach(function() {
    user = require('../fixtures/user');
    spyOn(user, 'save');
    oauth = {
      token: 'foobar',
      profile: {
        id: '1234',
        email: 'foo@foo.com'
      }
    };
  });

  afterEach(function() {
    user = undefined;
    oauth = undefined;
  });

  describe('#linkOAuth', function() {

    beforeEach(function() {
      spyOn(user,'getOAuthPhoto');
      spyOn(user, 'getOAuthName');
    });

    describe('Link Facebook account', function() {
      it('should set Facebook token, id, and profile', function() {
        oauth.provider = 'facebook';
        oauth.profile.email = 'foo@foo.com';
        user.linkOAuth(oauth, function(){});
        expect(user.facebook.id).toEqual('1234');
        expect(user.email).toEqual('foo@foo.com');
        expect(user.facebook.token).toEqual('foobar');
        expect(user.facebook.profile).toEqual(oauth.profile);
      });
    });

    describe('Link Google account', function() {
      it('should set Google token, id, and profile', function() {
        oauth.provider = 'google';
        oauth.profile.emails = [{ value:'foo@foo.com' }];
        user.linkOAuth(oauth, function(){});
        expect(user.google.id).toEqual('1234');
        expect(user.email).toEqual('foo@foo.com');
        expect(user.google.token).toEqual('foobar');
        expect(user.google.profile).toEqual(oauth.profile);
      });
    });

    describe('Link Twitter account', function() {
      it('should set Twitter token, id, and profile', function() {
        oauth.provider = 'twitter';
        oauth.profile.email = 'foo@foo.com';
        user.linkOAuth(oauth, function(){});
        expect(user.twitter.id).toEqual('1234');
        expect(user.email).toEqual('foo@foo.com');
        expect(user.twitter.token).toEqual('foobar');
        expect(user.twitter.profile).toEqual(oauth.profile);
      });
    });

    describe('Link Foursquare account', function() {
      it('should set Foursquare token, id, and profile', function() {
        oauth.provider = 'foursquare';
        oauth.profile.email = 'foo@foo.com';
        user.linkOAuth(oauth, function(){});
        expect(user.email).toEqual('foo@foo.com');
        expect(user.foursquare.id).toEqual('1234');
        expect(user.foursquare.token).toEqual('foobar');
        expect(user.foursquare.profile).toEqual(oauth.profile);
      });
    });

    describe('Link Github account', function() {
      it('should set Github token, id, and profile', function() {
        oauth.provider = 'github';
        oauth.profile.email = 'foo@foo.com';
        user.linkOAuth(oauth, function(){});
        expect(user.github.id).toEqual('1234');
        expect(user.email).toEqual('foo@foo.com');
        expect(user.github.token).toEqual('foobar');
        expect(user.github.profile).toEqual(oauth.profile);
      });
    });

  });

  describe('#unlinkOAuth', function() {
    describe('Unlink Facebook', function() {
      it('should unset facebook token and profile', function() {
        user.unlinkOAuth('facebook');
        expect(user.facebook.token).toEqual(undefined);
      });
    });
    describe('Unlink Google', function() {
      it('should unset Google token and profile', function() {
        user.unlinkOAuth('google');
        expect(user.google.token).toEqual(undefined);
      });
    });
    describe('Unlink Twitter', function() {
      it('should unset Twitter token and profile', function() {
        user.unlinkOAuth('twitter');
        expect(user.twitter.token).toEqual(undefined);
      });
    });
    describe('Unlink Foursquare', function() {
      it('should unset Foursquare', function() {
        user.unlinkOAuth('foursquare');
        expect(user.foursquare.token).toEqual(undefined);
      });
    });
    describe('Unlink Github', function() {
      it('should unset Github token and profile', function() {
        user.unlinkOAuth('github');
        expect(user.github.token).toEqual(undefined);
      });
    });
  });

  describe('#getEmail', function() {
    it('should return Facebook email', function() {
      var profile = { email: 'foo@foo.com' };
      var email = user.getEmail('facebook', profile);
      expect(email).toEqual('foo@foo.com');
    });
    it('should return Google email', function() {
      var profile = { emails: [{ value: 'foo@foo.com' }] };
      var email = user.getEmail('google', profile);
      expect(email).toEqual('foo@foo.com');
    });
    it('should return Twitter email', function() {
      var profile = { email: 'foo@foo.com' };
      var email = user.getEmail('twitter', profile);
      expect(email).toEqual('foo@foo.com');
    });
    it('should return Github email', function() {
      var profile = { email: 'foo@foo.com' };
      var email = user.getEmail('github', profile);
      expect(email).toEqual('foo@foo.com');
    });
    it('should return Foursquare email', function() {
      var profile = { email: 'foo@foo.com' };
      var email = user.getEmail('foursquare', profile);
      expect(email).toEqual('foo@foo.com');
    });
  });

  describe('.getOAuthName()', function() {
    it('should return Facebook name', function() {
      var profile = {
        name: 'Foo Bar',
      };
      var name = user.getOAuthName('facebook', profile);
      expect(name).toEqual('Foo Bar');
    });
    it('should return Twitter name', function() {
      var profile = {
        name: 'Foo Bar',
      };
      var name = user.getOAuthName('twitter', profile);
      expect(name).toEqual('Foo Bar');
    });
    it('should return Github name', function() {
      var profile = {
        name: 'Foo Bar',
      };
      var name = user.getOAuthName('github', profile);
      expect(name).toEqual('Foo Bar');
    });
    it('should return Google name', function() {
      var profile = {
        displayName: 'Foo Bar',
      };
      var name = user.getOAuthName('google', profile);
      expect(name).toEqual('Foo Bar');
    });
    it('should return Foursquare name', function() {
      var profile = {
        firstName: 'Foo',
        lastName: 'Bar'
      };
      var name = user.getOAuthName('foursquare', profile);
      expect(name).toEqual('Foo Bar');
    });
  });

  describe('.getOAuthPhoto()', function() {
    it('should return Google photo', function() {
      var profile = {
        image: {
          url: 'foo?sz=50'
        }
      };
      var photo = user.getOAuthPhoto('google', profile);
      expect(photo).toEqual('foo?sz=200');
    });
    it('should return Foursquare photo', function() {
      var profile = {
        photo: {
          prefix: 'foo/',
          suffix: '/bar'
        }
      };
      var photo = user.getOAuthPhoto('foursquare', profile);
      expect(photo).toEqual('foo/original/bar');
    });
  });

  describe('.confirmAccount()', function() {
    it('should set confirmAccountToken to undefined', function() {
      user.confirmAccountToken = 'meow';
      user.confirmAccount();
      expect(user.confirmAccountToken).toEqual(undefined);
    });
  });

  describe('.sendReset()', function() {
    it('should send user reset email', function() {
      user.sendReset();
      expect(user.save).toHaveBeenCalled();
    });
  });

});
