angular.module('sbAdminApp')
    .controller('listOfDocCtrl', function($scope,$http) {


        $http.get("/user/listofdoc")
            .then(function(response) {
                $scope.myWelcome = response.data;
                console.log($scope.myWelcome);
            },function(err){
                $scope.error = err;
            });
    });
