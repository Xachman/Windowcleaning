var app = angular.module('app');

app.controller('jobsCtrl', function ($scope, $http) {
    $scope.jobs = [];
    $scope.placeholder;
    $scope.searchTerm = '';
    $scope.select = '';
    $scope.selectOption = ['Name', 'Location', 'Address'];
    $http({
        method: 'POST',
        url: '/data/jobs'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log('suc');
       var data = response.data;
       $scope.placeholder = data.pop();
       $scope.jobs = data;
       console.log($scope.placeholder);
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('err');
        console.log(response);
    });
    
    $scope.edit = function(id){
        window.location = '/#/customers/'+id;
    }
});

app.controller('jobsEditCtrl', function ($scope, $http, $routeParams) {
    $scope.id = $routeParams.id;
    $scope.customer;
    $scope.order = []
    $http({
        method: 'POST',
        url: '/data/edit-customer',
        data: {id: $scope.id}
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log('suc');
        console.log(response);
        $scope.customer = response.data;
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('err');
        console.log(response);
    });
    
    $scope.save = function() {
        console.log($scope.customer);
        $http({
        method: 'POST',
        url: '/data/save-customer',
        data: $scope.customer
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log('suc');
            console.log(response);
           // $scope.customer = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('err');
            console.log(response);
        });
    }
});