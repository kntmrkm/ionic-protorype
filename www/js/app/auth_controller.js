angular.module('starter.controllers')

.controller('AuthCtrl', function($rootScope, $scope, $q,
  $ionicModal, $ionicActionSheet, $ionicLoading,
  $timeout, $state, API, authService, $cordovaFacebook) {
  var _this = this;

  $scope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
    if (toState.url === '/logout') {
      _this.showLogOutMenu();
    }
  });

  // Data ==================================================================
  this.loginForm = {
    email: 'user@example.com',
    password: 'user@example.com'
  };
  //this.registrationForm = {};

  // Facebook ==================================================================
  _this.loginWithFacebook = function () {
    $cordovaFacebook.login(['public_profile', 'email']).then(function(response) {

      return $cordovaFacebook.api('me', ['public_profile']);
    }).then(function(response) {

    }).catch(function(cause) {

    });
  };

  var setToAuthService = function(authResponse, profileInfo) {
    authService.setUser({
      authResponse: authResponse,
      userID: profileInfo.id,
      name: profileInfo.name,
      email: profileInfo.email,
      picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large",
      accessToken: authResponse.accessToken
    });
  };

  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
      .then(function(profileInfo) {
        // For the purpose of this example I will store user data on local storage
        setToAuthService(authResponse, profileInfo)

        $rootScope.isLoggedInWithFacebook = true;
        $state.go('app.home');
      }, function(fail){
        // Fail get profile info
        console.log('profile info fail', fail);
      });
    $ionicLoading.hide();
  };

  var fbLoginError = function(error){
    alert('fbLoginError', error);
    //$ionicLoading.hide();
  };

  var getFacebookProfileInfo = function(authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        console.log(response);
        info.resolve(response);
      },
      function (response) {
        console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  _this.facebookSignIn = function() {
    facebookConnectPlugin.getLoginStatus(function(success) {
      alert('getLoginStatus: ' + success.status);

      if(success.status === 'connected'){
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire

        // Check if we have our user saved
        var user = authService.getUser('facebook');
        $rootScope.isLoggedInWithFacebook = true;

        if (!user.userID) {
          getFacebookProfileInfo(success.authResponse)
            .then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage
            setToAuthService(success.authResponse, profileInfo)

            $state.go('app.home');
          }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
          });
        } else {
          $state.go('app.home');
        }

      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
        // but has not authenticated your app
        // Else the person is not logged into Facebook,
        // so we're not sure if they are logged into this app or not.

        $ionicLoading.show({
          template: 'Logging in...'
        });

        // Ask the permissions you need. You can learn more about
        // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };

  /*
  _this.logout = function () {
    $cordovaFacebook.logout().then(function(response) {

    }).catch(function(cause) {

    });
  };
  */

  // Auth ==================================================================
  this.showLogOutMenu = function() {
    //alert('showLogOutMenu');
    //var hideSheet = $ionicActionSheet.show({
    $ionicActionSheet.show({
      destructiveText: 'Logout',
      titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
      cancelText: 'Cancel',
      cancel: function() {
        $state.go('app.home');
      },
      buttonClicked: function(index) {
        return true;
      },
      destructiveButtonClicked: function(){
        $ionicLoading.show({
          template: 'Logging out...'
        });

        // Facebook logout
        facebookConnectPlugin.logout(function(){
          $rootScope.isLoggedInWithFacebook = false;
          _this.doLogout();

          $ionicLoading.hide();
          $state.go('auth.home');
        },
        function(fail){
          $ionicLoading.hide();
          $state.go('app.home');
        });
      }
    });
  };

  this.doLogout = function() {
    API.logout();
  };

  // Perform the login action when the user submits the login form
  this.doLogin = function() {
    console.log('Doing login', _this.loginForm);

    API.login(_this.loginForm)
      .success(function(res) {
        alert('sign in successfully');

        $rootScope.isLoggedIn = true;
        $state.go('app.home');
      })
      .error(function(res) {
        console.log('sign in failure');
      });

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    /*
    $timeout(function() {
      this.closeLogin();
    }, 1000);
    */
  };

  // Test ==================================================================
  this.checkStateGoFunction = function() {
    $state.go('auth.test');
  };

  //this.doRegistration = function() {};

  /*
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: _this
  }).then(function(modal) {
    _this.modal = modal;
  });

  // Triggered in the login modal to close it
  this.closeLogin = function() {
    _this.modal.hide();
  };

  // Open the login modal
  this.login = function() {
    _this.modal.show();
  };
  */

})
;
