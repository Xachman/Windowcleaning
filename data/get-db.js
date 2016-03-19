module.exports.getData = function (req, res, data) {
    res.send(JSON.stringify(getDb()));
}