var app = angular.module('app', ['ngRoute']);
app.config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/customers', {
                templateUrl: '/views/templates/customers',
                controller: 'customersCtrl'
            })
            .when('/customers/:id', {
                templateUrl: '/views/templates/customers-edit',
                controller: 'customersEditCtrl'
            })
            .when('/jobs', {
                templateUrl: '/views/templates/jobs',
                controller: 'jobsCtrl'
            })
    }
]);