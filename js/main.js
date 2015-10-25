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

function queryClients(settings) {

  var sql = "SELECT "+settings.fields+" FROM clients";
  if(settings.like != '' && typeof settings.like != 'undefined'){
    sql+=" WHERE name LIKE '%"+settings.like+"%'";
  }
  if(settings.limit !== '0' && settings.limit !== '' && settings.limit !== 0){
    sql+=' LIMIT '+settings.limit;
  }
  if(settings.off !== '0' && settings.off !== '' && settings.off !== 0){
    sql+=', '+settings.off;
  }

  console.log(sql);
  db.query( sql, function(err, rows, fields) {
    if (!err){
      console.log(rows);
      global.queryOut = rows;
      $(document).trigger('MySQL');
      return rows;
    }
    else{
     alert('Error while performing Query: '+err);
    }
  });
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function insertDb(table, post) {
  db.query('INSERT INTO '+table+' SET ?', post, function(err, result) {
    console.log('result:' + result);
    console.log('err:' + err);
  });
}
