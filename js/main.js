var windowDB = require('windowclean-database');
var troll = require('windowclean-controller');
var child = require('child_process');
var apidata = require('windowclean-datahandler').apidata;
var remoteURL = 'http://localhost/app.shorewindowcleaning.com/';
// Load native UI library
var ngui = require('nw.gui');
// Get the current window
var nwin = ngui.Window.get();

nwin.maximize();
db = windowDB.db;
var gui = require("nw.gui");
var thedata;
function checkLogin(f) {
  $.get(remoteURL+'?d=status', function(data){
    data = JSON.parse(data);
    if(data.login === 0) {
      f();
    }else{
      global.login === true;
    }
  });
}
function login() {
  var f = {};
  f.email = 'zironside@hotmail.com';
  f.password = 'picpic';
  $.post(remoteURL+'login-processor', f,function(data){
    console.log(data);
    checkLogin();
  });
}
checkLogin(login);

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function queryClients(settings) {
  $.post(remoteURL+'?d=search-clients', settings, function(data){
    global.clientsJSON = JSON.parse(data);
    $(document).trigger('data');
  });
}
