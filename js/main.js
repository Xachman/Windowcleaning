var windowDB = require('windowclean-database');
var troll = require('windowclean-controller');
var child = require('child_process');
if(typeof global.template === 'undefined')
  global.template = 'home';
db = windowDB.db;
var gui = require("nw.gui");

var win_main = gui.Window.get();
win_main.on('close', function () {
    this.hide(); // Pretend to be closed already
    console.log(child.execSync('cd ./mysql-5.6.27-winx64/bin & mysqladmin -u root shutdown '));

    // here you detect if data is saved, and if not, ask user if they want to save

    this.close(true);   // if this line executes the app closes, if not,
                        // app stays opened
});
console.log(child.execSync('cd ./mysql-5.6.27-winx64/bin & START /B mysqld'));

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
