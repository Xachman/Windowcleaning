var app = angular.module('app');

app.controller('customersCtrl', function ($scope, $http) {
    $scope.customers = [];
    $scope.placeholder;
    $scope.searchTerm = '';
    $scope.select = '';
    $scope.selectOption = [{name: 'Name', val:'by_name'}, {name: 'Location', val:'by_location'}, {name: 'Address', val:'by_address'}];
    
    
    $scope.edit = function(id){
        window.location = '/#/customers/'+id;
    }
    
    $scope.getCustomers = function(send) {
        $http({
            method: 'POST',
            url: '/data/customers',
            data: send
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log('suc');
           var data = response.data;
           $scope.placeholder = data.pop();
           $scope.customers = data;
           console.log($scope.placeholder);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('err');
            console.log(response);
        }); 
    }
    
    $scope.getCustomers();
    
    $scope.searchTermFunc = function(term) {
        console.log(term);
         $scope.getCustomers({startkey: term});
    }
    $scope.searchTermFunc = function(term) {
        console.log(term);
         $scope.getCustomers({startkey: term});
    }
});

app.controller('customersEditCtrl', function ($scope, $http, $routeParams) {
    $scope.id = $routeParams.id;
    $scope.customer;
    $scope.order = [];
    $scope.jobs;
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
        $scope.getJobs();
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
    $scope.getJobs = function() {
        $http({
        method: 'POST',
        url: '/data/jobs',
        data: {view:'cus_id', startkey: $scope.customer.CUS_ID, endkey: $scope.customer.CUS_ID}
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log('suc');
            console.log(response);
            $scope.jobs = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('err');
            console.log(response);
        });
    }
});