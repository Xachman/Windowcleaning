var app = angular.module('app');

app.controller('customersCtrl', function ($scope, $http) {
    $scope.customers = [];
    $scope.placeholder;
    $scope.searchTerm = '';
    $scope.select = '';
    $scope.selectOption = [{name: 'Name', val: 'by_name'}, {name: 'Location', val: 'by_location'}, {name: 'Address', val: 'by_address'}];


    $scope.edit = function (id) {
        window.open('/#/customers/' + id);
    }

    $scope.getCustomers = function (send) {
        var params = {
            viewGroup: 'customers',
            view: 'by_name',
            limit: 101
        }
        for (att in send) {
            params[att] = send[att];
        }
        $http({
            method: 'POST',
            url: '/data/get-view',
            data: params
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

    $scope.searchTermFunc = function (term) {
        console.log(term);
        $scope.getCustomers({startkey: term});
    }
    $scope.searchTermFunc = function (term) {
        console.log(term);
        $scope.getCustomers({startkey: term});
    }
});

app.controller('customersEditCtrl', function ($scope, $http, $routeParams) {
    $scope.id = $routeParams.id;
    $scope.customer;
    $scope.order = [];
    $scope.jobs;
    $scope.job;
    $scope.dateFields = ['NACTIVE_DT', 'OBT_DT']
    $scope.init = function (send) {
        $http({
            method: 'POST',
            url: '/data/edit',
            data: {id: $scope.id}
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log('suc');
            console.log(response);
            $scope.customer = response.data;
            $scope.getJobs({keys: [$scope.customer.CUS_ID, $scope.customer._id]});
            $scope.clearNull($scope.customer);
            $scope.makeDates($scope.customer, $scope.dateFields);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('err');
            console.log(response);
        });
    };
    
    $scope.save = function () {
        console.log($scope.customer);
        $http({
            method: 'POST',
            url: '/data/save',
            data: $scope.customer
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log('suc');
            console.log(response);
            events.emit('update');
            // $scope.customer = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('err');
            console.log(response);
        });
    }
    $scope.getJobs = function (send) {
        var params = {
            viewGroup: 'job',
            view: 'cus_id'
        }
        for (att in send) {
            params[att] = send[att]
        }
        $http({
            method: 'POST',
            url: '/data/get-view',
            data: params
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
    $scope.selectJob = function (id) {
        for (var i = 0; i < $scope.jobs.length; i++) {
            if ($scope.jobs[i]._id == id) {
                $scope.job = $scope.jobs[i];
            }
        }
    }
    $scope.addJob = function () {
        console.log($scope.job);
        window.open('/#/job-add/' + $scope.id);
    }
    $scope.editJob = function () {
        window.open('/#/job-edit/' + $scope.job._id);
    }
    $scope.removeJob = function () {
        var params = {_id: $scope.job._id, _rev: $scope.job._rev};
        $http({
            method: 'POST',
            url: '/data/delete',
            data: params
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log('suc');
            console.log(response);
            $scope.getJobs({keys: [$scope.customer.CUS_ID, $scope.customer._id]});
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('err');
            console.log(response);
        });
    }
    
    $scope.init();
});