var mongoose = require('mongoose');

var usuarioModel = mongoose.model('usuarios');
var parseParams = require('../utils/parse-params');

module.exports = function(app) {
  app.get('/api/usuarios', function(req, resp) {
    usuarioModel.find().then(function(dados){
      resp.json(dados);
    }, function(erro) {
      resp.status(500).json(erro);
    })
  });
  app.post('/api/usuarios', function(req, resp) {
    usuarioModel.create(req.body)
      .then(function(dado) {
        resp.json(dado);
      }, function(erro) {
        resp.status(500).json(erro);
      });
  });
  app.put('/api/usuarios/:id', function(req, resp) {
    usuarioModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .then(function(data) {
        resp.json(data);
      }, function(erro) {
        resp.status(500).json(erro);
      });
  });
  app.delete('/api/usuarios/:id', function(req, resp) {
    usuarioModel.remove({_id: req.params.id})
      .then(function() {
        resp.send();
      }, function(erro) {
        resp.status(500).json(erro);
      });
  });
  app.get('/api/usuarios/:id', function(req, resp) {
    usuarioModel.findById(req.params.id)
      .then(function(data) {
        resp.json(data);
      }, function(erro) {
        resp.status(500).json(erro);
      });
  });
}