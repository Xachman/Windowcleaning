var windowDB;
//var troll = require('windowclean-controller');
var child = require('child_process');
var db;
if(global.dbConex === true) {
  
}

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
