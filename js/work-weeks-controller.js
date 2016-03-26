var app = angular.module('app');

app.controller('workWeeksCtrl', function ($scope, $http) {
    $scope.jobs = [];
    $scope.placeholder;
    $scope.searchTerm = '';
    $scope.select = '';
    $scope.selectOption = ['Name', 'Location', 'Address'];
    $scope.customers = [];
    $scope.techs = [];
    $scope.firstDay;
    $scope.lastDay;
    $scope.dateRange = [];
    $scope.date = new Date();

    $scope.getJobs = function(args, callback) {
        var params = {
            url: '/data/get-view',
            method: 'POST'
        }
        for (att in args) {
            params[att] = args[att]
        }
        $scope.getData(params, callback);
    }
    $scope.getCustomers = function (data) {
        $scope.jobs = data;
        var cusids = $scope.getCusIds(data);

        var getCusIds = function (data) {
            
            setCustomers(data);
            console.log("jobs");
            console.log($scope.jobs);
            console.log("customers");
            console.log($scope.customers);
            $scope.setTechs();
            console.log("techs");
            $scope.combineCustomersToJobs();
            console.log($scope.techs);
        }
        var setCustomers = function (data) {
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                $scope.customers.push(d);
            }
        }

        $scope.getData({url: '/data/get-view', viewGroup: 'customers', view: 'cus_id', keys: cusids,  method: 'POST'}, getCusIds)
    }
    $scope.getIds = function (send) {
        //getids code
    }

    $scope.edit = function (id) {
        window.location = '/#/customers/' + id;
    }

    $scope.setWeek = function () {
        $scope.reset();
        var curr = $scope.date; // get current date
        console.log(curr);
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6

        var firstday = new Date(curr.setDate(first));
        var lastday = new Date(curr.setDate(last));
        $scope.firstDay = firstday;
        $scope.lastDay = lastday;
        var startday = new Date(firstday);
        while (startday.getTime() <= lastday.getTime()) {
            
            var year = startday.getFullYear();
            var month = ("0" + (startday.getMonth() + 1)).slice(-2);
            var date = ("0" + startday.getDate()).slice(-2);
            $scope.dateRange.push(year + '' + month + '' + date);
            startday.setDate(startday.getDate() + 1);
        }
        console.log($scope.dateRange);

        this.getJobs({startkey: this.formatDate(firstday), endkey: this.formatDate(lastday)}, $scope.getCustomers)
    }

    /**
     * @param {Date} date
     */
    $scope.formatDate = function (date) {
        return date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2);
    }

    $scope.getCusIds = function (data) {
        var cusids = [];
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            if ($scope.checkArray(cusids, d.CUS_ID))
                cusids.push(d.CUS_ID);
        }
        return cusids;
        //this.getData({viewGroup: 'customers', view: 'cus_id', keys: cusids}, )
    }

//    $scope.checkCusIds = function() {
//        var customers = $scope.customers;
//        for(var i = 0; i < customers.length; i++) {
//            var customer = customers[i];
//            if(customer.CUS_ID ==  || )
//        }
//    }
//    
//    $scope.checkId = function(id) {
//        var cusids = $scope.getCusIds($scope.jobs);
//        for(var i = 0; i < cusids.length; i++) {
//            var customer = customers[i];
//            if(id ==  )
//        }
//    }
    

    $scope.setTechs = function () {
        var techs = $scope.techs;
        var jobs = $scope.jobs;
        for (var i = 0; i < jobs.length; i++) {
            if ($scope.checkObjArray(techs, "name", jobs[i].SVC_BY)) {
                $scope.addTech(jobs[i]);
            } else {
                var tech = $scope.findTech(jobs[i].SVC_BY);
                $scope.addJobByDay(tech, jobs[i]);
            }
        }
    }
    $scope.orderJobs = function () {

    }
    $scope.findTech = function (name) {
        var techs = $scope.techs;
        for (var i = 0; i < techs.length; i++) {
            if (techs[i].name === name) {
                return techs[i];
            }
        }
    }
    $scope.addJobByDay = function (tech, job) {
        console.log(tech);
        var dates = Object.keys(tech.dates);

        for (var i = 0; i < dates.length; i++) {
            var date = dates[i];
            if (date == job.SVC_DT) {
                tech.dates[date].push(job);
                return;
            }
        }
        return false;
    }
    $scope.addTech = function (job) {
        var techs = $scope.techs;
        var tech = {name: job.SVC_BY}

        tech.dates = {};
        for (i in $scope.dateRange) {
            tech.dates[$scope.dateRange[i]] = [];
        }

        $scope.addJobByDay(tech, job);

        techs.push(tech);
    }
    $scope.combineCustomersToJobs = function () {
        var jobs = $scope.jobs;
        for (var i = 0; i < jobs.length; i++) {
            var job = jobs[i];
            job.customer = $scope.findCustomerById(job.CUS_ID);
        }
    }
    $scope.findCustomerById = function (id) {
        var customers = $scope.customers;
        for (var i = 0; i < customers.length; i++) {
            if (id == customers[i].CUS_ID) {
                return customers[i];
            }
        }
    }
    $scope.reset = function() {
        $scope.techs = [];
        $scope.dateRange = [];
    }
    $scope.setWeek();
});
