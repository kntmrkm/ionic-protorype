angular.module('starter.controllers', [])

.controller('AppCtrl', function($rootScope, $scope, $state, $ionicModal, $timeout, $auth, API, Cookie) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

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
        alert(e.url);
        ref.close();
      }
    });
  };

  // Auth
  this.validateUser = function() {
    $auth.validateUser();
  };
  $scope.$on('auth:validation-success', function(ev, data) {
    alert('signed in now!');
  });
  $scope.$on('auth:validation-error', function(ev, data) {
    alert('not signed in now!');
  });

  // Setting ==================================================================
  this.getProfile = function() {


  };

  this.getCSRFToken = function() {
    API.getCSRFToken().then(function(res) {
      console.log('got CSRF TOKEN.');
    });
  };

  this.showCSRFToken = function() {
    Cookie.showCSRFToken();
  };

  this.getCSRFToken();
  this.showCSRFToken();
  //this.validateUser();
})
;
