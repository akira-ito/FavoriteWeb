var welcomeApp = angular.module("welcomeApp", []);
welcomeApp.controller("welcomeCtlr", function($scope, $timeout, $window){
  $timeout(function(){
    alert(55);
    $window.location.href = "/";
    // $location.path();
  }, 3000);
})
