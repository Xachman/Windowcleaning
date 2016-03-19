var app = angular.module('app');

app.controller('appCtrl', function ($scope) {
    $scope.clearNull = function(obj) {
       var keys = Object.keys(obj);
       keys.forEach(function(el, i, ar){
            if(obj[el] === 'null') {
                obj[el] = '';
            }
       });
    }
    $scope.makeDates = function(obj, dateFields) {
        var keys = Object.keys(obj);
        keys.forEach(function (el, i, ar) {
            if (dateFields.indexOf(el) > -1) {
                var dateString = obj[el];
                if(dateString.length > 8){
                    return;
                }
                var year = dateString.slice(0,4);
                var month = dateString.slice(4, 6);
                var day = dateString.slice(6, 8)
                obj[el] = year+'-'+month+'-'+day;
            }
        });
        console.log('date')
        console.log(obj);
    }
});