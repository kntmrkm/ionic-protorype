angular.module('starter.controllers', [])

.controller('AppCtrl', function($rootScope, $scope, $state, $ionicModal, $timeout, API) {
  var _this = this;

  // Data ==================================================================
  this.profile = {};
  this.profileForm = {};

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Auth ==================================================================
  this.doLogout = function() {
    API.logout();
  };

  // Profile ===================================================================
  this.getProfile = function() {
    API.getProfile().then(function(res) {
      _this.profile = res.data;
      _this.profileForm = res.data;
    });
  };

  this.saveProfile = function() {
    API.updateProfile(_this.profileForm).then(function(res) {
      _this.profile = _this.profileForm;
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
