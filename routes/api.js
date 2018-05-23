/* jshint node: true */
/* jshint esversion: 6 */

var express = require('express');
var api = express.Router();
var ProductoController = require('../controllers/producto');
var UserController = require('../controllers/user');
var ContactController = require('../controllers/feedback');

api.post('/login/', UserController.login);
api.post('/register/', UserController.register);

api.post('/contacto/', ContactController.sendFeedback);
api.post('/feedback/', ContactController.getFeedback);

api.get('/marcas/', ProductoController.getMarcas);
api.get('/categorias/', ProductoController.getCategorias);
api.get('/productoscat/:categoria', ProductoController.getProductosCategorias);
api.get('/productosmar/:marca', ProductoController.getProductosMarcas);
api.get('/productos/', ProductoController.getProductos);
api.get('/destacados/', ProductoController.getDestacados);
api.post('/producto/', ProductoController.newProducto);
api.put('/producto/:referencia', ProductoController.updateProducto);
api.delete('/producto/:referencia', ProductoController.deleteProducto);

module.exports = api;