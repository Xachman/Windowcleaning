module.exports.getData = function (req, res, data) {
    var docs = [];
    db.insert(data, function (err, body) {
        if (!err)
            res.send(body);
        else 
            res.send(err);
    });
}


