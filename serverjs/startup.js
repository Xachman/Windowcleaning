var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
db = require('nano')('http://ironside.ddns.net:5984/shorewindowcleaning');

//db.view('views', 'customers', {limit: 101}, function(err, body) {
//  if (!err) {
//    body.rows.forEach(function(doc) {
//      console.log(doc.value);
//    });
//  }
//});

app.set('views',  __dirname+'/../views');
app.set('view engine', 'jade');
app.get('/', function (req, res) {
    res.render('index');
});
var routes = ['css', 'js', 'node_modules'];

for (var i = 0; i < routes.length; i++) {
    app.get('/' + routes[i] + '/*', function (req, res) {
        res.sendFile(path.resolve(__dirname+'/../'+req.url));
    });
}
app.post('/data/*', jsonParser,function (req, res) {
    console.log(req.body);
    var data = require(path.resolve(__dirname+'/../data/'+req.params[0]+'.js'));
    data.getData(req, res, req.body);
});
app.get('/views/*', function (req, res) {
    res.render(path.resolve(__dirname+'/../'+req.url));
});
app.listen(3789, function () {
    console.log('Example app listening on port 3789!');
});

//console.log(app);