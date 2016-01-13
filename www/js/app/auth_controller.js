angular.module('starter.controllers')

.controller('AuthCtrl', function($scope, $ionicModal, $timeout, $state, $auth) {
  var _this = this;

  // Form data for the login modal
  this.loginForm = {};
  this.registrationForm = {};

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

  // Perform the login action when the user submits the login form
  this.doLogin = function() {
    console.log('Doing login', _this.loginForm);

    $auth.submitLogin(_this.loginForm).then(function(resp) {
      $state.go('app/home');
    });
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    /*
    $timeout(function() {
      this.closeLogin();
    }, 1000);
    */
  };
  this.doRegistration = function() {
    $auth.submitRegistration(_this.registrationForm).then(function(resp) {
      _this.registrationForm = {};

      $state.go('app/home');
    }).catch(function(resp) {
      _this.registrationForm.password = "";
      _this.registrationForm.password_confirmation = "";
    });
  };
})
;
