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

angular.module('starter', ['ionic', 'starter.controllers', 'ipCookie', 'ngResource', 'restmod',
  'ng-token-auth', 'ngStorage'])

.run(function($rootScope, $state, $ionicPlatform, API, authService) {
  $ionicPlatform.ready(function() {
    API.getCSRFToken();
    API.getAuthStatus();

    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
      if (toState.isLoginRequired) {
        if (!authService.isLoggedIn()) {
          alert('Login required');
          $state.go('auth/home');
          e.preventDefault(); // stop change state.
        }
      }
    });

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

    // browser の場合上記でエラーがでるため
    // initialize this does not work.
    alert('initialize');
  });
})

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
  // http://stackoverflow.com/questions/25345773/cors-issue-with-phonegap-angular-app-and-rails
  //$httpProvider.defaults.useXDomain = true;
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

.config(function($authProvider) {
  $authProvider.configure({
    apiUrl: settings.host_api_v1,
    storage: 'localStorage',
    authProviderPaths: {
      facebook: '/auth/facebook'
    }
  })
})

.config(function($stateProvider, $urlRouterProvider) {
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth/home');

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl as app',
    //isLoginRequired: true
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
  .state('auth.home', {
    url: '/home',
    views: {
      'tabHome': {
        templateUrl: 'templates/auth/home.html'
      }
    }
  })
  .state('auth.login', {
    url: '/login',
    views: {
      'tabLogin': {
        templateUrl: 'templates/auth/login.html'
      }
    }
  })
  .state('auth.test', {
    url: '/test',
    views: {
      'tabTest': {
        templateUrl: 'templates/auth/test.html'
      }
    }
  })
})
;
