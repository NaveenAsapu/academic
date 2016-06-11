'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MainCtrl', function($scope,$http) {
      $http.get("/user/listofdoc")
          .then(function(response) {
            $scope.listofdocs = response.data;
            console.log($scope.myWelcome);
          },function(err){
            $scope.error = err;
          });

      $http.get("/user/listofxml")
          .then(function(response) {
            $scope.listofxml = response.data;
            console.log($scope.myWelcome);
          },function(err){
            $scope.error = err;
          });
      $http.get("/user/listofjson")
          .then(function(response) {
            $scope.listofjson = response.data;
            console.log($scope.myWelcome);
          },function(err){
            $scope.error = err;
          });
  });
