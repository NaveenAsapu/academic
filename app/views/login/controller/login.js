'use strict';

angular.module('Authentication')

    .controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
        function ($scope, $rootScope, $location, AuthenticationService) {
            // reset login status
            AuthenticationService.ClearCredentials();

            $scope.login = function () {

                $scope.dataLoading = true;
                AuthenticationService.Login($scope.username, $scope.password, function(response) {
                    if(response.username == $scope.username) {
                        AuthenticationService.SetCredentials($scope.username, $scope.password);
                        $location.path('/dashboard/home');
                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
            };
        }]).controller('signupController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
        function ($scope, $rootScope, $location, AuthenticationService) {
            // reset login status
           /* AuthenticationService.ClearCredentials();*/

            $scope.signup = function () {

                $scope.dataLoading = true;
                AuthenticationService.signup($scope.user, function(response) {
                    console.log('asdasd',response);
                    if(response.username == $scope.user.username) {
                        AuthenticationService.SetCredentials($scope.user.username, $scope.user.password);
                        $location.path('/dashboard/home');
                    } if(response.msg) {

                        $scope.error = response.msg;
                        console.log($scope.error);
                    }else
                     {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
            };
        }]);