// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var host = 'http://lvh.me:3000';
//var host = 'https://cordova-rails.herokuapp.com';
var settings = {
  host_api:    host + '/api',
  host_api_v1: host + '/api/v1'
};

angular.module('starter', ['ionic', 'starter.controllers', 'ng-token-auth', 'ipCookie'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function(API) {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // initialize
    //API.getCSRFToken().then(function(res) {
      //console.log('got CSRF TOKEN.');
    //});
  });
})

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
}])

.config(function($stateProvider, $urlRouterProvider) {
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl as app'
  })
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html'
      }
    }
  })
  .state('app.setting', {
    url: '/setting',
    views: {
      'menuContent': {
        templateUrl: 'templates/setting.html'
      }
    }
  })
  .state('app.test', {
    url: '/test',
    views: {
      'menuContent': {
        templateUrl: 'templates/test.html'
      }
    }
  })
})
// auth controller
.config(function($stateProvider) {
  $stateProvider

  .state('auth', {
    url: '/auth',
    abstract: true,
    templateUrl: 'templates/auth.html',
    controller: 'AuthCtrl as auth'
  })
  .state('auth.default', {
    url: '/default',
    views: {
      'menuContent': {
        templateUrl: 'templates/auth/default.html'
      }
    }
  })
});
;
