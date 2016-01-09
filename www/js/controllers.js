angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.openWebApp = function() {
    var encodedHref = encodeURIComponent(window.location.href);
    var appURL = host + '/relay_ios?' + [ 'apphome='+encodedHref, 'from=ios'].join('&');
    var ref = window.open(appURL, '_self', 'location=yes');

  };

  $scope.loginProc = function() {
    var ref = window.open(host + '/users/sign_in', '_blank', 'location=yes,clearcache=no');
    ref.addEventListener("loadstop", function(e) {
      // new RegExp(val, 'g')
      if(e.url.match(new RegExp('^' + host + '/profile', 'im'))) {
        alert(e.url);
        ref.close();
      }
    });
  };
})
;
