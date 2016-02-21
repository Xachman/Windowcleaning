module.exports.getData = function (req, res, data) {
    db.destoy(data._id, data._rev, function (err, body) {
        if (!err) {
            res.send(JSON.stringify(body));
        }else{
            res.send(JSON.stringify(err));
        }
    });
}

