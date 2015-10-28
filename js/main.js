var windowDB = require('windowclean-database');
var troll = require('windowclean-controller');
var child = require('child_process');

// Load native UI library
var ngui = require('nw.gui');
// Get the current window
var nwin = ngui.Window.get();

nwin.maximize();
db = windowDB.db;
var gui = require("nw.gui");
var thedata;
function checkLogin(f) {
  $.get('http://localhost/lask-app.shorewindowcleaning.com?d=status', function(data){
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
  $.post('http://localhost/lask-app.shorewindowcleaning.com/login-processor', f,function(data){
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
  $.post('http://localhost/lask-app.shorewindowcleaning.com/?d=search-clients', settings, function(data){
    global.clientsJSON = JSON.parse(data);
    $(document).trigger('data');
  });
}
