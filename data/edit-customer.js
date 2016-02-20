module.exports.getData = function(req, res, data){
        var docs = [];
        var params = {limit: 101};
        params.view = 'by_name';
        for (var attrname in data) { params[attrname] = data[attrname]; }
        
        console.log(params)
        db.get(data.id, function(err, body) {
          if (!err) {      
            res.send(JSON.stringify(body));
          }
        });
} 


