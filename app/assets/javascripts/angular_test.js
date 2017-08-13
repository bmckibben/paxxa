var appMusing = angular.module('angular_test', []);

appMusing.controller('GreetingController', [
  '$scope',
  function($scope){
    $scope.greeting = 'Sup!';
  }
]);