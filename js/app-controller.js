var app = angular.module('app');

app.controller('appCtrl', function ($scope) {
    $scope.clearNull = function (obj) {
        var keys = Object.keys(obj);
        keys.forEach(function (el, i, ar) {
            if (obj[el] === 'null') {
                obj[el] = '';
            }
        });
    }
    $scope.makeDates = function (obj, dateFields) {
        var keys = Object.keys(obj);
        keys.forEach(function (el, i, ar) {
            if (dateFields.indexOf(el) > -1) {
                var dateString = obj[el];
                if (dateString.length > 8) {
                    return;
                }
                var year = dateString.slice(0, 4);
                var month = dateString.slice(4, 6);
                var day = dateString.slice(6, 8)
                obj[el] = year + '-' + month + '-' + day;
            }
        });
        console.log('date')
        console.log(obj);
    }

    $scope.checkInt = function (str) {
        return !isNaN(parseInt(str));
    }

    $scope.checkArray = function (arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                return false;
            }
        }
        return true;
    }

    $scope.checkObjArray = function (arr, key, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][key] === val) {
                return false;
            }
        }
        return true;
    }

    $scope.formatDate = function (dateString) {
        if (dateString.length > 8) {
            return;
        }
        var year = dateString.slice(0, 4);
        var month = dateString.slice(4, 6);
        var day = dateString.slice(6, 8)
        return month + '/' + day + '/' + year;
    }
});