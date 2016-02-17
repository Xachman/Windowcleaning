module.exports.getData = function(req, res){
        var docs = [];
        db.view('views', 'customers', {limit: 101}, function(err, body) {
          if (!err) {
            body.rows.forEach(function(doc) {
              docs.push(doc.value);
            });
            res.send(JSON.stringify(docs));
          }
        });
} 


