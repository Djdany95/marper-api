/* jshint node: true */
/* jshint esversion: 6 */

const Feedback = require('../models/feedback');

function sendFeedback(req, res) {
    var params = req.body;

    var feedback = new Feedback();

    feedback.nombre = params.nombre;
    feedback.email = params.email;
    feedback.telefono = params.telefono;
    feedback.msg = params.msg;
    feedback.creationDate = new Date();

    feedback.save((err, feedback) => {
        if (err) {
            res
                .status(500)
                .send({
                    accion: 'send feedback',
                    error: 'Server Error 500'
                });
        } else {
            res.status(200).send({
                accion: 'send feedback',
                data: 'feedbackOK'
            });
        }
    });
}

function getFeedback(req, res) {
    if (req.body.masterKey === 'marperhosteleria') {
        SeriesList.find({}, {
            __v: 0
        }).exec((err, feedback) => {
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