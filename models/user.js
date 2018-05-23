/* jshint node: true */
/* jshint esversion: 6 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    usuario: String,
    pass: String,
    admin: Boolean
});

// exportamos el modelo
module.exports = mongoose.model('User', UserSchema);