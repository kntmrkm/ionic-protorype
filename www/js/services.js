angular.module('starter')

.service('authService', function (ipCookie) {
  this.isLoggedIn = function () {
    return ipCookie('SIGNED-IN');
  };
})
.provider('Profile', function() {
  this.$get = ['$resource', function($resource) {
    //var Profile = $resource('/api/v1/profile', { id: '@id' }, {
    var Profile = $resource(settings.host_api_v1 + '/profile', { }, {
        show: { method: 'GET', url: settings.host_api_v1 + '/profile' },
        update: { method: 'PATCH', url: settings.host_api_v1 + '/profile' }
      }
    );

    Profile.prototype = {

    };

    return Profile;
  }];
})
.factory('API', function($http, ipCookie, $sessionStorage) {
  return {
    // Auth
    login: function(loginForm) {
      var res = $http.post(settings.host_api + '/users/sign_in',
        { user: {
            email: loginForm.email,
            password: loginForm.password
        }}).success(function (data, status, headers, config) {
          //alert(data.api_token);
          ipCookie('API-TOKEN', data.api_token);
          ipCookie('SIGNED-IN', true);
        }).error(function (data, status, headers, config) {
          alert('wrong password or email.');
        });
      return res;
    },
    logout: function() {
      var res = $http.delete(settings.host_api + '/users/sign_out')
        .then(function (data, status, headers, config) {
          ipCookie('API-TOKEN', null);
          ipCookie('SIGNED-IN', false);
        });
      return res;
    },
    // public
    getUsers: function() {
      var res = $http.get(settings.host_api_v1 + '/public/users')
        .success(function (data, status, headers, config) {});
      return res;
    },
    getAuthStatus: function() {
      var res = $http.get(settings.host_api + '/check_session')
        .then(function (data, status, headers, config) {

          ipCookie('SIGNED-IN', data.data.signed_in);
        });
      return res;
    },
    // for rails
    getCSRFToken: function() {
      var res = $http.get(settings.host_api + '/csrf_token.json')
        .success(function (data, status, headers, config) {
          // rails側ではなくresponseからセットする（ionicの場合にrails側でセットされない）
          ipCookie('CSRF-TOKEN', data.csrf_token);

          //alert('cookie: ' + ipCookie('CSRF-TOKEN'));
          //alert('session: ' + $sessionStorage.csrf_token);
          console.log('got CSRF TOKEN.');
        });
      return res;
    }
  }
})
.factory('httpRequestInterceptor', function(ipCookie) {
  return {
    request: function($config) {
      $config.headers['X-CSRF-TOKEN'] = ipCookie('CSRF-TOKEN');
      $config.headers['Authorization'] = 'Token token="' + ipCookie('API-TOKEN') + '"';
      return $config;
    }
  }
})
// 以下、検証用
.factory('Status', function(ipCookie, $sessionStorage) {
  return {
    showCookie: function() {
      alert('cookie["CSRF-TOKEN"]:' + ipCookie('CSRF-TOKEN'));
    },
    showSessionStorage: function() {
      alert('sessionStorage.csrf_token:' + $sessionStorage.csrf_token);
    }
  }
});
