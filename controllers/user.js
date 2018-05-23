/* jshint node: true */
/* jshint esversion: 6 */

const User = require('../models/user');

function login(req, res) {
  var params = req.body;
  User.find({
    usuario: params.usuario,
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

function register(req, res) {
  var params = req.body;

  var user = new User();
  user.usuario = params.usuario;
  user.pass = params.pass;
  user.admin = params.admin;

  user.save(function(err, newUser) {
    if (err) {
      res.status(500).send({
        accion: 'save user',
        error: 'Server Error 500'
      });
    } else {
      res.status(200).send({
        accion: 'save user',
        data: newUser
      });
    }
  });
}

module.exports = {
  login,
  register
};
