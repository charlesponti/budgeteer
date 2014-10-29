describe('User', function() {
  'use strict';
  
  require('../spec_helper');
  
  var user, oauth, sandbox;

  beforeEach(function() {
    user = new User();
    sandbox = sinon.sandbox.create();
    user.save = sandbox.spy();
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
    sandbox.restore();
  });

  describe('#linkOAuth', function() {

    beforeEach(function() {
      user.getOAuthPhoto = sinon.spy();
      user.getOAuthName = sinon.spy();
    });

    describe('Link Facebook account', function() {
      it('should set Facebook token, id, and profile', function() {
        oauth.provider = 'facebook';
        oauth.profile.email = 'foo@foo.com';
        user.linkOAuth(oauth, function(){});
        expect(user.facebook.id).to.equal('1234');
        expect(user.email).to.equal('foo@foo.com');
        expect(user.facebook.token).to.equal('foobar');
        expect(user.facebook.profile).to.deep.equal(oauth.profile);
      });
    });

    describe('Link Google account', function() {
      it('should set Google token, id, and profile', function() {
        oauth.provider = 'google';
        oauth.profile.emails = [{ value:'foo@foo.com' }];
        user.linkOAuth(oauth, function(){});
        expect(user.google.id).to.equal('1234');
        expect(user.email).to.equal('foo@foo.com');
        expect(user.google.token).to.equal('foobar');
        expect(user.google.profile).to.deep.equal(oauth.profile);
      });
    });

    describe('Link Twitter account', function() {
      it('should set Twitter token, id, and profile', function() {
        oauth.provider = 'twitter';
        oauth.profile.email = 'foo@foo.com';
        user.linkOAuth(oauth, function(){});
        expect(user.twitter.id).to.equal('1234');
        expect(user.email).to.equal('foo@foo.com');
        expect(user.twitter.token).to.equal('foobar');
        expect(user.twitter.profile).to.deep.equal(oauth.profile);
      });
    });

    describe('Link Foursquare account', function() {
      it('should set Foursquare token, id, and profile', function() {
        oauth.provider = 'foursquare';
        oauth.profile.email = 'foo@foo.com';
        user.linkOAuth(oauth, function(){});
        expect(user.email).to.equal('foo@foo.com');
        expect(user.foursquare.id).to.equal('1234');
        expect(user.foursquare.token).to.equal('foobar');
        expect(user.foursquare.profile).to.deep.equal(oauth.profile);
      });
    });

    describe('Link Github account', function() {
      it('should set Github token, id, and profile', function() {
        oauth.provider = 'github';
        oauth.profile.email = 'foo@foo.com';
        user.linkOAuth(oauth, function(){});
        expect(user.github.id).to.equal('1234');
        expect(user.email).to.equal('foo@foo.com');
        expect(user.github.token).to.equal('foobar');
        expect(user.github.profile).to.deep.equal(oauth.profile);
      });
    });

  });

  describe('#unlinkOAuth', function() {
    describe('Unlink Facebook', function() {
      it('should unset facebook token and profile', function() {
        user.unlinkOAuth('facebook');
        expect(user.facebook.token).to.equal(undefined);
      });
    });
    describe('Unlink Google', function() {
      it('should unset Google token and profile', function() {
        user.unlinkOAuth('google');
        expect(user.google.token).to.equal(undefined);
      });
    });
    describe('Unlink Twitter', function() {
      it('should unset Twitter token and profile', function() {
        user.unlinkOAuth('twitter');
        expect(user.twitter.token).to.equal(undefined);
      });
    });
    describe('Unlink Foursquare', function() {
      it('should unset Foursquare', function() {
        user.unlinkOAuth('foursquare');
        expect(user.foursquare.token).to.equal(undefined);
      });
    });
    describe('Unlink Github', function() {
      it('should unset Github token and profile', function() {
        user.unlinkOAuth('github');
        expect(user.github.token).to.equal(undefined);
      });
    });
  });
  
  describe('#getEmail', function() {
    it('should return Facebook email', function() {
      var profile = { email: 'foo@foo.com' };
      var email = user.getEmail('facebook', profile);
      expect(email).to.equal('foo@foo.com');
    });
    it('should return Google email', function() {
      var profile = { emails: [{ value: 'foo@foo.com' }] };
      var email = user.getEmail('google', profile);
      expect(email).to.equal('foo@foo.com');
    });
    it('should return Twitter email', function() {
      var profile = { email: 'foo@foo.com' };
      var email = user.getEmail('twitter', profile);
      expect(email).to.equal('foo@foo.com');
    });
    it('should return Github email', function() {
      var profile = { email: 'foo@foo.com' };
      var email = user.getEmail('github', profile);
      expect(email).to.equal('foo@foo.com');
    });
    it('should return Foursquare email', function() {
      var profile = { email: 'foo@foo.com' };
      var email = user.getEmail('foursquare', profile);
      expect(email).to.equal('foo@foo.com');
    });
  });

  // getOAuthName: function(provider, profile) {
  //   // TODO Store user screenname/email from provider
  //   // {{ current_user.facebook.profile.email }}
  //   // {{ current_user.twitter.profile.screen_name }}
  //   // {{ current_user.google.profile.emails[0].value }}
  //   // {{ current_user.foursquareName() }}
  //   // {{ current_user.github.profile.login }}
  //   switch(provider) {
  //     case 'facebook':
  //     case 'github':
  //     case 'twitter':
  //       return profile.name;
  //     case 'google':
  //       return profile.displayName;
  //     case 'foursquare':
  //       return profile.firstName + " " + profile.lastName;
  //   }
  // },
  describe('.getOAuthName()', function() {
    it('should return Facebook name', function() {
      var profile = {
        name: 'Foo Bar',
      };
      var name = user.getOAuthName('facebook', profile);
      expect(name).to.equal('Foo Bar');
    });
    it('should return Twitter name', function() {
      var profile = {
        name: 'Foo Bar',
      };
      var name = user.getOAuthName('twitter', profile);
      expect(name).to.equal('Foo Bar');
    });
    it('should return Github name', function() {
      var profile = {
        name: 'Foo Bar',
      };
      var name = user.getOAuthName('github', profile);
      expect(name).to.equal('Foo Bar');
    });
    it('should return Google name', function() {
      var profile = {
        displayName: 'Foo Bar',
      };
      var name = user.getOAuthName('google', profile);
      expect(name).to.equal('Foo Bar');
    });
    it('should return Foursquare name', function() {
      var profile = {
        firstName: 'Foo',
        lastName: 'Bar'
      };
      var name = user.getOAuthName('foursquare', profile);
      expect(name).to.equal('Foo Bar');
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
      expect(photo).to.equal('foo?sz=200');
    });
    it('should return Foursquare photo', function() {
      var profile = {
        photo: {
          prefix: 'foo/',
          suffix: '/bar'
        }
      };
      var photo = user.getOAuthPhoto('foursquare', profile);
      expect(photo).to.equal('foo/original/bar');
    });
  });
  
  describe('.confirmAccount()', function() {
    it('should set confirmAccountToken to undefined', function() {
      user.confirmAccountToken = 'meow';
      user.confirmAccount();
      expect(user.confirmAccountToken).to.equal(undefined);
    });
  });

  describe('.sendReset()', function() {
    it('should send user reset email', function() {
      sinon.stub(Cthulhu.mailer.emails.users, 'reset');
      user.sendReset();
      expect(Cthulhu.mailer.emails.users.reset.called).to.equal(true);
      expect(user.save.called).to.equal(true);
    });
  });

});
