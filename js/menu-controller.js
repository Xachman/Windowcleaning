var app = angular.module('app');

app.controller('menuCtrl', function ($scope) {
    $scope.links = [
        { 
            name: "File",
            sublinks: [
                {name: "Customers",
                link: '/#/customers'},
                {name: "Jobs",
                link: '/#/jobs'},
                {name: "sub3"},
                {name: "sub4"},
                {name: "sub5"}
            ]
        },
        { 
            name: "Tools",
            sublinks: [
                {name: "sub1"},
                {name: "sub2"},
                {name: "sub3"},
                {name: "sub4"},
                {name: "sub5"}
            ]
        },
        { 
            name: "Reports",
            sublinks: [
                {name: "sub1"},
                {name: "sub2"},
                {name: "sub3"},
                {name: "sub4"},
                {name: "sub5"}
            ]
        },
        { 
            name: "Settings",
            sublinks: [
                {name: "Database",
                link: '/#/settings/db'},
                {name: "sub2"},
                {name: "sub3"},
                {name: "sub4"},
                {name: "sub5"}
            ]
        }
            
    ];
});