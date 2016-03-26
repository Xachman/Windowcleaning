module.exports.getData = function (req, res, data) {
    var docs = [];
    var params = {};
    params.view = 'by_name';
    for (var attrname in data) {
        params[attrname] = data[attrname];
    }

    console.log(params)
    db.fetch(params.ids, params, function (err, body) {
        if (!err) {
            body.rows.forEach(function (doc) {
                docs.push(doc.value);
            });
            res.send(JSON.stringify(docs));
        }
    });
}