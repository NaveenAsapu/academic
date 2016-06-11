'use strict';

angular.module('Authentication')

    .factory('AuthenticationService',
    [ '$http', '$cookieStore', '$rootScope', '$timeout',
        function ( $http, $cookieStore, $rootScope) {
            var service = {};

            service.Login = function (username, password, callback) {
                console.log("aaaaa",username,password);

                /* Use this for real authentication
                 ----------------------------------------------*/
                $http.post('/login', { username: username, password: password })
                    .success(function (response) {
                        callback(response);
                    }).error(function(err){
                        callback(err);
                    });

            };
            service.signup = function (data, callback) {
                console.log("data---",data);

                /* Use this for real authentication
                 ----------------------------------------------*/
                $http.post('/signup', data)
                    .success(function (response) {
                        callback(response);
                    }).error(function(err){
                        console.log('sdfd',err);
                        callback(err);
                    });

            };

            service.SetCredentials = function (username, password) {
                //var authdata = Base64.encode(username + ':' + password);

                $rootScope.globals = {
                    currentUser: {
                        username: username,
                        password: password
                    }
                };

                $http.defaults.headers.common['Authorization'] = 'Basic ' + username + ':' + password; // jshint ignore:line
                $cookieStore.put('globals', $rootScope.globals);
            };

            service.ClearCredentials = function () {
                $rootScope.globals = {};
                $cookieStore.remove('globals');
                $http.defaults.headers.common.Authorization = 'Basic ';
            };

            return service;
        }])