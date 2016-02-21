module.exports.getData = function (req, res, data) {
    db.get(data.id, function (err, body) {
        if (!err) {
            res.send(JSON.stringify(body));
        }
    });
}


