var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var jsonfile = require('jsonfile');
var util = require('util');

var file = 'config.json';



//db.view('views', 'customers', {limit: 101}, function(err, body) {
//  if (!err) {
//    body.rows.forEach(function(doc) {
//      console.log(doc.value);
//    });
//  }
//});
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname+'/../views/index.html'));
});
var routes = ['css', 'js', 'node_modules'];

for (var i = 0; i < routes.length; i++) {
    app.get('/' + routes[i] + '/*', function (req, res) {
        res.sendFile(path.resolve(__dirname+'/../'+req.url));
    });
}
app.post('/data/*', jsonParser,function (req, res) {
    var data = require(path.resolve(__dirname+'/../data/'+req.params[0]+'.js'));
    data.getData(req, res, req.body);
});
app.get('/views/*', function (req, res) {
    res.sendFile(path.resolve(__dirname+'/../'+req.url+'.html'));
});
app.listen(3789, function () {
    console.log('Example app listening on port 3789!');
});


getDb = function() {
    return config.database;
};

setDb = function() {
    setConfig();
    var dbcreds = config.database;
    
    var dburl = dbcreds.dburl;
    var dbname = encodeURI(dbcreds.dbname);
    var dbpass = encodeURI(dbcreds.dbpass);
    var dbuser = encodeURI(dbcreds.dbuser);
    
    db = require('nano')('http://'+dbuser+':'+dbpass+'@'+dburl+'/'+dbname);

};

setConfig = function() {
    config = jsonfile.readFileSync(file);
};

setDb();