var windowDB = require('windowclean-database');
db = windowDB.db;


db.query("SELECT * FROM clients LIMIT 2", function(err, rows, fields) {
  if (!err){
    console.log(rows);
  }
  else{
    console.log('Error while performing Query.');
  }
});
