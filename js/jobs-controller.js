var app = angular.module('app');

app.controller('jobsCtrl', function ($scope, $http) {
    $scope.jobs = [];
    $scope.placeholder;
    $scope.searchTerm = '';
    $scope.select = '';
    $scope.selectOption = ['Name', 'Location', 'Address'];
    
    $scope.getJobs = function (send) {
        var params = {
            viewGroup: 'job',
            view: 'by_date'
        }
        for (att in send) { params[att] =  send[att]}
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
            $scope.jobs = data;
            console.log($scope.placeholder);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('err');
            console.log(response);
        });
    }


    $scope.edit = function (id) {
        window.location = '/#/customers/' + id;
    }
    
    
    $scope.getJobs();
});

app.controller('jobsEditCtrl', function ($scope, $http, $routeParams) {
    $scope.jobId = $routeParams.jobId;
    $scope.customerId = $routeParams.customerId;
    console.log($scope.customerId);
    $scope.job;
    
    $http({
        method: 'POST',
        url: '/data/edit',
        data: {id: $scope.jobId}
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log('suc');
        console.log(response);
        $scope.job = response.data;
        $scope.job.type="job";
        $scope.job.SVC_DT = $scope.formatDate($scope.job.SVC_DT);
        $scope.job.SVC_DT = new Date($scope.job.SVC_DT);
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('err');
        console.log(response);
    });

    $scope.update = function () {
        if(typeof $scope.job.CUS_ID === 'undefined' ) $scope.job.CUS_ID = $scope.customerId;
        console.log($scope.job);
        console.log($scope.customer);
        $scope.job.SVC_DT = $scope.formatDateForDb($scope.job.SVC_DT );
        console.log($scope.job.SVC_DT);
        $http({
            method: 'POST',
            url: '/data/save',
            data: $scope.job
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