var app = angular.module('app');

app.controller('settingsDbCtrl', function ($scope, $http) {
    $scope.settings = {
        dbname: {label: 'Database Name', val: ''},
        dbuser: {label: 'Database User', val: ''},
        dbpass: {label: 'Database Password', val: ''},
        dburl: {label: 'Database Url', val: ''}
    };
    $http({
        method: 'POST',
        url: '/data/get-db'
    }).then(function successCallback(response) {
        var dbcreds = $scope.settings;
        // this callback will be called asynchronously
        // when the response is available
        console.log('suc');
        var data = response.data;
        console.log(data);
        dbcreds.dbname.val = data.dbname;
        dbcreds.dbuser.val = data.dbuser;
        dbcreds.dbpass.val = data.dbpass;
        dbcreds.dburl.val = data.dburl;
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('err');
        console.log(response);
    });
    $scope.submitDb = function () {
        $http({
            method: 'POST',
            url: '/data/save-db',
            data: {
                dbname: $scope.settings.dbname.val,
                dbuser: $scope.settings.dbuser.val,
                dbpass: $scope.settings.dbpass.val,
                dburl: $scope.settings.dburl.val
            }
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log('suc');
            var data = response.data;
            console.log(data);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('err');
            console.log(response);
        });
    }
});

