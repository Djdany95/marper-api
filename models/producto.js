/* jshint node: true */
/* jshint esversion: 6 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    referencia: String,
    nombre: String,
    precio: Number,
    categoria: String,
    marca: String,
    imageUrl: String,
    destacado: Boolean
});

// exportamos el modelo
module.exports = mongoose.model('Producto', ProductoSchema);