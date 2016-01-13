angular.module('starter')

.service('authService', function () {
  this.isLoggedIn = function () {
      return false;
  };
  this.isLoggedInAtWebview = function () {
      return false;
  };
})
.provider('Profile', function() {
  this.$get = ['$resource', function($resource) {
    //var Profile = $resource('/api/v1/profile', { id: '@id' }, {
    var Profile = $resource(settings.host_api + '/profile', { }, {
        show: { method: 'GET', url: '/api/v1/profile' }
      }
    );

    Profile.prototype = {
    };
    return Profile;
  }];
})
.factory('API', function($http) {
  return {
    getCSRFToken: function() {
      var res = $http.get(settings.host_api + '/csrf_token')
          .success(function (data, status, headers, config) {});
      return res;
    },
    getUsers: function() {
      var res = $http.get(settings.host_api_v1 + '/public/users')
          .success(function (data, status, headers, config) {});
      return res;
    }
  }
})
.factory('httpRequestInterceptor', function(ipCookie) {
  return {
    request: function($config) {
      $config.headers['X-CSRF-TOKEN'] = ipCookie('CSRF-TOKEN');
      return $config;
    }
  }
})
.factory('Cookie', function(ipCookie) { // 検証用
  return {
    showCSRFToken: function() {
      alert('cookie["CSRF-TOKEN"]:' + ipCookie('CSRF-TOKEN'));
    }
  }
});
