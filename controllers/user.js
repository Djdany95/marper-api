/* jshint node: true */
/* jshint esversion: 6 */

const User = require('../models/user');

function login(req, res) {
    var params = req.body;
    User.find({
        usuario: params.username,
        pass: params.pass
    }).exec((err, userLogged) => {
        if (err) {
            res.status(500).send({
                accion: 'get user',
                error: 'Server Error 500'
            });
        } else if (!userLogged[0]) {
            res.status(404).send({
                accion: 'get user',
                error: 'User 404'
            });
        } else if (!userLogged[0].admin) {
            res.status(403).send({
                accion: 'get user',
                error: 'Not admin'
            });
        } else {
            res.status(200).send({
                accion: 'get user',
                data: 'OK'
            });
        }
    });
}


module.exports = {
    login,
};