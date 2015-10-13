var path = require('path');
var url = require('url') ;
Controller = {
  root: '../pa',
}
troll = Controller;
http = require('http');

var server = http.createServer(function (req, res) {
  console.log(req.url);
  req.requrl = url.parse(req.url, true);
  if (req.requrl.pathname === '/path/to/resource') {
    handlerFunction(req, res);
  }
});
