/* jshint node: true */
/* jshint esversion: 6 */

const Feedback = require('../models/feedback');
const nodemailer = require('nodemailer');
const constants = require('../constants');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: constants.email,
    pass: constants.pass
  }
});

function sendFeedback(req, res) {
  var params = req.body;

  var feedback = new Feedback();

  feedback.nombre = params.nombre;
  feedback.email = params.email;
  feedback.telefono = params.telefono ? params.telefono : 'Sin telefono';
  feedback.msg = params.msg;
  feedback.creationDate = new Date();

  feedback.save((err, feedbackSent) => {
    if (err) {
      res.status(500).send({
        accion: 'send feedback',
        error: err
      });
    } else {
      var mailOptions = {
        from: constants.email,
        to: constants.email,
        subject: feedbackSent.nombre + " ha contactado en Marper",
        text:
          'Fecha: ' +
          feedbackSent.creationDate +
          '\n' +
          'De: ' +
          feedbackSent.nombre +
          '\n' +
          'Desde: ' +
          feedbackSent.email +
          '\n' +
          'Tlf: ' +
          feedbackSent.telefono +
          '\n' +
          'Mensaje: ' +
          feedbackSent.msg
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          res.status(500).send({ accion: 'send feedback', error: error });
        } else {
          res.status(200).send({
            accion: 'send feedback',
            data: 'msgSent',
            email: info.response
          });
        }
      });
    }
  });
}

function getFeedback(req, res) {
  if (req.body.masterKey === 'marperhosteleria') {
    SeriesList.find(
      {},
      {
        __v: 0
      }
    ).exec((err, feedback) => {
      res.status(200).send({
        accion: 'get feedback',
        data: feedback
      });
    });
  } else {
    res.status(500).send({
      accion: 'get feedback',
      error: 'ACCESS DENIED'
    });
  }
}

module.exports = {
  sendFeedback,
  getFeedback
};
