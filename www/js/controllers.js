angular.module('starter.controllers', [])

.controller('AppCtrl', function($rootScope, $scope, $state, $ionicModal, $timeout, API, authService, Profile, Status) {
  var _this = this;
  var isLoggedIn = false;

  authService.isLoggedIn();

  // Data ==================================================================
  this.profileForm = {};

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Profile ===================================================================
  this.getProfile = function() {
    Profile.show(null, function(_profile) {
      _this.profile = _profile;
    });
  };

  this.saveProfile = function() {
    Profile.update(_this.profileForm, function(_profile) {
      _this.profile = _profile;
    });
  };

  // Public   ==================================================================
  this.getUsers = function() {
    API.getUsers().then(function(res) {
      //console.log(res.data[0].name);
      _this.users = res.data;
    });
  };

  // Webview ==================================================================
  this.openWebApp = function() {
    var encodedHref = encodeURIComponent(window.location.href);
    var appURL = host + '/relay_ios?' + [ 'apphome='+encodedHref, 'from=ios'].join('&');
    var ref = window.open(appURL, '_self', 'location=yes');

  };

  this.loginProc = function() {
    var ref = window.open(host + '/users/sign_in', '_blank', 'location=yes, clearcache=no');

    ref.addEventListener("loadstop", function(e) {
      // new RegExp(val, 'g')
      if(e.url.match(new RegExp('^' + host + '/profile', 'im'))) {
        //alert(e.url);
        ref.close();
      }
    });
  };

  // Test ==================================================================
  this.checkStateGoFunction = function() {
    $state.go('app/test');
  };

  // etc ==================================================================
  // for ng-token-auth
/*
  this.validateUser = function() {
    $auth.validateUser();
  };
  $scope.$on('auth:validation-success', function(ev, data) {
    alert('signed in now!');
  });
  $scope.$on('auth:validation-error', function(ev, data) {
    alert('not signed in now!');
  });
*/
  //this.getCSRFToken();
  //this.validateUser();
})
;
