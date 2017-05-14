var mongoose = require('mongoose');

var agendamentosModel = mongoose.model('agendamentos');
var parseParams = require('../utils/parse-params');

module.exports = function(app) {
  app.get('/api/agendamentos', function(req, resp) {
    agendamentosModel.find(parseParams(req.query.filter), [], {sort: {id: 1}})
      .populate('i_categorias')
      .then(function(dados){
      resp.json(dados);
    }, function(erro) {
      resp.status(500).json(erro);
    })
  });
  app.post('/api/agendamentos', function(req, resp) {
    agendamentosModel.create(req.body)
      .then(function(dado) {
        resp.json(dado);
      }, function(erro) {
        resp.status(500).json(erro);
      });
  });
  app.put('/api/agendamentos/:id', function(req, resp) {
    agendamentosModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .then(function(data) {
        resp.json(data);
      }, function(erro) {
        resp.status(500).json(erro);
      });
  });
  app.delete('/api/agendamentos/:id', function(req, resp) {
    agendamentosModel.remove({_id: req.params.id})
      .then(function() {
        resp.send();
      }, function(erro) {
        resp.status(500).json(erro);
      });
  });
  app.get('/api/agendamentos/:id', function(req, resp) {
    agendamentosModel.findById(req.params.id)
      .then(function(data) {
        resp.json(data);
      }, function(erro) {
        resp.status(500).json(erro);
      });
  });
}