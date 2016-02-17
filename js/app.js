var app = angular.module('app', ['ngRoute']);
app.config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/customers', {
                templateUrl: '/views/templates/customers',
                controller: 'customersCtrl'
            })
            .when('/edit-task', {
                templateUrl: '/views/templates/edit-task',
                controller: 'tasksCtrl'
            })
            .when('/customers/:id', {
                templateUrl: '/views/templates/customers-edit',
                controller: 'customersEditCtrl'
            })
    }
]);