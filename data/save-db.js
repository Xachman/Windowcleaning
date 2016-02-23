var jsonfile = require('jsonfile');
var util = require('util');

module.exports.getData = function (req, res, data) {
    var file = 'config.json';
    var obj = {database: data}

    jsonfile.writeFile(file, obj, function (err) {
      console.error(err)
    });
}

