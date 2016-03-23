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


    $scope.getData = function (send, callback) {
        var params = {
            viewGroup: 'job',
            view: 'by_date'
        }
        for (att in send) { params[att] =  send[att]}
        
        console.log(params);
        $http({
            method: 'POST',
            url: '/data/get-view',
            data: params
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log('suc');
            console.log(response.data);
            callback(response.data);
            
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
    
    $scope.setWeek = function(startday) {
        var curr = new Date("06/22/2015"); // get current date
        console.log(curr);
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6

        var firstday = new Date(curr.setDate(first));
        var lastday = new Date(curr.setDate(last));
        $scope.firstDay = firstday;
        $scope.lastDay = lastday;
        
        this.getData({startkey: this.formatDate(firstday), endkey: this.formatDate(lastday)}, $scope.getCustomers)
    }
    
    /**
    * @param {Date} date
    */
    $scope.formatDate = function(date) {
        return date.getFullYear()+("0"+(date.getMonth()+1)).slice(-2)+("0"+date.getDate()).slice(-2);
    }
    
    $scope.getCusIds = function(data) {
        var cusids = [];
        for(var i = 0; i < data.length; i++) {
            var d = data[i];
            if($scope.checkArray(cusids, d.CUS_ID))
                cusids.push(d.CUS_ID);
        }
        return cusids;
        //this.getData({viewGroup: 'customers', view: 'cus_id', keys: cusids}, )
    }
    
    
    $scope.getCustomers = function(data) {
        $scope.jobs = data;
        var cusids = $scope.getCusIds(data);
        
        var getCusIds = function(data) {
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
        var setCustomers = function(data) {
            for(var i = 0; i < data.length; i++) {
                var d = data[i];
                $scope.customers.push(d);
            }
        }
        
        $scope.getData({viewGroup: 'customers', view: 'cus_id', keys: cusids}, getCusIds)
    }
    
    $scope.setTechs = function() {
        var techs = $scope.techs;
        var jobs = $scope.jobs;
        for(var i = 0; i < jobs.length; i++) {
            if($scope.checkObjArray(techs, "tech", jobs[i].SVC_BY)){
                techs.push({tech: jobs[i].SVC_BY, days: [[jobs[i]]]});
            }else{
                var tech = $scope.findTech(jobs[i].SVC_BY);
                $scope.addJobByDay(tech, jobs[i]);
            }
        }
    }
    $scope.orderJobs = function() {
        
    }
    $scope.findTech = function(name) {
        var techs = $scope.techs;
        for(var i = 0; i < techs.length; i++) {
            if(techs[i].tech === name) {
                return techs[i];
            }
        }
    }
    $scope.addJobByDay = function(tech, job) {
        for(var i = 0; i < tech.days.length; i++) {
            var day = tech.days[i];
            var checkJob = day[0];
            if(checkJob.SVC_DT == job.SVC_DT){
                day.push(job);
                return;
            };
        }
        tech.days.push([job])
    }
    
    $scope.combineCustomersToJobs = function() {
        var jobs = $scope.jobs;
        for(var i = 0; i < jobs.length; i++) {
            var job = jobs[i];
            job.customer = $scope.findCustomerById(job.CUS_ID);
        }
    }
    $scope.findCustomerById = function(id) {
        var customers = $scope.customers;
        for( var i = 0; i < customers.length; i++) {
            if(id == customers[i].CUS_ID) {
                return customers[i];
            } 
        }
    }
    $scope.setWeek();
});
