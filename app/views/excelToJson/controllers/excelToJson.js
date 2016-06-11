angular.module('sbAdminApp')
    .controller('excelTOJsonCtrl', function($scope,Upload) {

        $scope.submit = function() {
            if ($scope.form.file.$valid && $scope.file) {
                $scope.upload($scope.file);
            }
        };

        // upload on file select or drop
        $scope.uploadPic = function (file) {
            console.log('aaaaa',file);
            Upload.upload({
                url: '/user/xlsxtojson',
                data: {file: file, 'username': $scope.username}
            }).then(function (resp) {
                $scope.responseOfjson = resp.data;
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };
    });