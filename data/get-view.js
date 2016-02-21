module.exports.getData = function (req, res, data) {
    var docs = [];
    var params = {limit: 101};
    params.view = 'by_name';
    for (var attrname in data) {
        params[attrname] = data[attrname];
    }

    console.log(params)
    db.view(params.viewGroup, params.view, params, function (err, body) {
        if (!err) {
            body.rows.forEach(function (doc) {
                docs.push(doc.value);
            });
            res.send(JSON.stringify(docs));
        }
    });
}

