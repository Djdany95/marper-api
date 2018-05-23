/* jshint node: true */
/* jshint esversion: 6 */

const Producto = require('../models/producto');

function getMarcas(req, res) {

    Producto.find().distinct('marca', function(err, marcas) {
        if (err) {
            res
                .status(500)
                .send({
                    accion: 'get marcas',
                    error: 'Server Error 500'
                });
        } else if (!marcas) {
            res.status(404).send({
                accion: 'get marcas',
                error: 'Productos 404'
            });
        } else {
            res.status(200).send({
                accion: 'get marcas',
                data: marcas
            });
        }
    });

}

function getCategorias(req, res) {

    Producto.find().distinct('categoria', function(err, categorias) {
        if (err) {
            res
                .status(500)
                .send({
                    accion: 'get categorias',
                    error: 'Server Error 500'
                });
        } else if (!categorias) {
            res.status(404).send({
                accion: 'get categorias',
                error: 'Productos 404'
            });
        } else {
            res.status(200).send({
                accion: 'get categorias',
                data: categorias
            });
        }
    });
}

function getProductosCategorias(req, res) {

    Producto.find({
            categoria: req.params.categoria
        }, {
            _id: 0,
            _v: 0
        })
        .exec((err, productos) => {
            if (err) {
                res
                    .status(500)
                    .send({
                        accion: 'get categorias',
                        error: 'Server Error 500'
                    });
            } else if (!productos) {
                res.status(404).send({
                    accion: 'get categorias',
                    error: 'Productos 404'
                });
            } else {
                res.status(200).send({
                    accion: 'get categorias',
                    data: productos
                });
            }
        });
}

function getProductosMarcas(req, res) {

    Producto.find({
            marca: req.params.marca
        }, {
            _id: 0,
            _v: 0
        })
        .exec((err, productos) => {
            if (err) {
                res
                    .status(500)
                    .send({
                        accion: 'get marcas',
                        error: 'Server Error 500'
                    });
            } else if (!productos) {
                res.status(404).send({
                    accion: 'get marcas',
                    error: 'Productos 404'
                });
            } else {
                res.status(200).send({
                    accion: 'get marcas',
                    data: productos
                });
            }
        });
}

function getProductos(req, res) {

    Producto.find({}, {
            _id: 0,
            _v: 0
        })
        .exec((err, productos) => {
            if (err) {
                res
                    .status(500)
                    .send({
                        accion: 'get productos',
                        error: 'Server Error 500'
                    });
            } else if (!productos) {
                res.status(404).send({
                    accion: 'get marcas',
                    error: 'productos 404'
                });
            } else {
                res.status(200).send({
                    accion: 'get productos',
                    data: productos
                });
            }
        });
}

function getDestacados(req, res) {

    Producto.find({
            destacado: true
        }, {
            _id: 0,
            _v: 0
        })
        .exec((err, destacados) => {
            if (err) {
                res
                    .status(500)
                    .send({
                        accion: 'get destacados',
                        error: 'Server Error 500'
                    });
            } else if (!destacados) {
                res.status(404).send({
                    accion: 'get destacados',
                    error: 'Productos 404'
                });
            } else {
                res.status(200).send({
                    accion: 'get destacados',
                    data: destacados
                });
            }
        });
}

function newProducto(req, res) {
    var params = req.body;

    var nProducto = new Producto();
    nProducto.referencia = params.referencia;
    nProducto.nombre = params.nombre;
    nProducto.precio = params.precio;
    nProducto.categoria = params.categoria;
    nProducto.marca = params.marca;
    nProducto.imageUrl = params.imageUrl ? params.imageUrl : 'https://via.placeholder.com/200x100';
    nProducto.destacado = params.destacado;

    nProducto.save(function(err, newProducto) {
        if (err) {
            res.status(500).send({
                accion: 'save producto',
                error: "Server Error 500"
            });
        } else {
            res.status(200).send({
                accion: 'save producto',
                data: newProducto
            });
        }
    });

}

function updateProducto(req, res) {
    var pReferencia = req.params.referencia;

    var params = req.body;

    Producto.findOneAndUpdate({
            referencia: pReferencia
        }, {
            $set: {
                referencia: params.referencia,
                nombre: params.nombre,
                precio: params.precio,
                categoria: params.categoria,
                marca: params.marca,
                imageUrl: params.imageUrl,
                destacado: params.destacado
            }
        }, {
            new: true
        },
        (err, productoUpdated) => {
            if (err) {
                res
                    .status(500)
                    .send({
                        accion: 'update Producto',
                        error: 'Server Error 500'
                    });
            } else {
                res
                    .status(200)
                    .send({
                        accion: 'update Producto',
                        data: productoUpdated
                    });
            }
        }
    );
}

function deleteProducto(req, res) {
    var pReferencia = req.params.referencia;

    var params = req.body;

    Producto.deleteOne({
        referencia: pReferencia
    }, function(err, productoDeleted) {
        if (err) {
            res
                .status(500)
                .send({
                    accion: 'delete Producto',
                    error: 'Server Error 500'
                });
        } else {
            res.status(200).send({
                accion: 'delete Producto',
                data: productoDeleted
            });

        }
    });
}

module.exports = {
    getMarcas,
    getCategorias,
    getProductosCategorias,
    getProductosMarcas,
    getProductos,
    getDestacados,
    newProducto,
    updateProducto,
    deleteProducto
};