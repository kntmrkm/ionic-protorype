angular.module('starter.controllers')

.controller('AuthCtrl', function($scope, $ionicModal, $timeout, $state, API, authService, Status, userStatus) {
  var _this = this;

  // Data ==================================================================
  this.loginForm = {
    email: 'user@example.com',
    password: 'user@example.com'
  };
  //this.registrationForm = {};

  // Auth ==================================================================
  // Perform the login action when the user submits the login form
  this.doLogin = function() {
    console.log('Doing login', _this.loginForm);

    API.login(_this.loginForm)
      .success(function(res) {
        alert('sign in successfully');

        userStatus.isLoggedIn = true;
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

  this.doLogout = function() {
    API.logout();
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
