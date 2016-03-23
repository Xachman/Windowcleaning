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
            .when('/job-edit/:jobId', {
                templateUrl: '/views/templates/job-add-edit',
                controller: 'jobsEditCtrl'
            })
            .when('/job-add/:customerId', {
                templateUrl: '/views/templates/job-add-edit',
                controller: 'jobsEditCtrl'
            })
            .when('/settings/db', {
                templateUrl: '/views/templates/settings-db',
                controller: 'settingsDbCtrl'
            })
            .when('/reports/work-weeks', {
                templateUrl: '/views/templates/reports/work-weeks',
                controller: 'workWeeksCtrl'
            })
    }
]);

app.filter("formatDate", function(){
    return function (dateString) {
        if (dateString.length > 8) {
            return;
        }
        var year = dateString.slice(0, 4);
        var month = dateString.slice(4, 6);
        var day = dateString.slice(6, 8)
        return month + '/' + day + '/' + year;
    }
});