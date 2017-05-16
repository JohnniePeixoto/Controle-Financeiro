var mongoose = require('mongoose');

var categoriasModel = mongoose.model('categorias');
var parseParams = require('../utils/parse-params');

module.exports = function(app) {
  app.get('/api/categorias', function(req, resp) {
    categoriasModel.find(parseParams(req.query.filter), [])
      .then(function(dados){
      resp.json(dados);
    }, function(erro) {
      resp.status(500).json(erro);
    })
  });
  app.post('/api/categorias', function(req, resp) {
    categoriasModel.create(req.body)
      .then(function(dado) {
        resp.json(dado);
      }, function(erro) {
        resp.status(500).json(erro);
      });
  });
  app.put('/api/categorias/:id', function(req, resp) {
    categoriasModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .then(function(data) {
        resp.json(data);
      }, function(erro) {
        resp.status(500).json(erro);
      });
  });
  app.delete('/api/categorias/:id', function(req, resp) {
    categoriasModel.remove({_id: req.params.id})
      .then(function() {
        resp.send();
      }, function(erro) {
        resp.status(500).json(erro);
      });
  });
  app.get('/api/categorias/:id', function(req, resp) {
    categoriasModel.findById(req.params.id)
      .then(function(data) {
        resp.json(data);
      }, function(erro) {
        resp.status(500).json(erro);
      });
  });
}