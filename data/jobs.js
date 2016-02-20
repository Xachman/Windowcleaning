module.exports.getData = function(req, res, data){
        var docs = [];
        var params = {limit: 101};
        params.view = 'by_date';
        for (var attrname in data) { params[attrname] = data[attrname]; }
        
        console.log('job: '+params.toString())
        db.view('job', params.view, params, function(err, body) {
          if (!err) {
            body.rows.forEach(function(doc) {
              docs.push(doc.value);
            });
            res.send(JSON.stringify(docs));
          }
        });
} 


