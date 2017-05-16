var mongoose = require('mongoose');

var movimentacoesModel = mongoose.model('movimentacoes');
var parseParams = require('../utils/parse-params');

module.exports = function(app) {
  app.get('/api/movimentacoes', function(req, resp) {
    movimentacoesModel.find(parseParams(req.query.filter), [], {sort: {data: -1}})
      .populate('i_categorias').then(function(dados){
      resp.json(dados);
    }, function(erro) {
      resp.status(500).json(erro);
    })
  });
  app.post('/api/movimentacoes', function(req, resp) {
    movimentacoesModel.create(req.body)
      .then(function(dado) {
        resp.json(dado);
      }, function(erro) {
        resp.status(500).json(erro);
      });
  });
  app.put('/api/movimentacoes/:id', function(req, resp) {
    movimentacoesModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .then(function(data) {
        resp.json(data);
      }, function(erro) {
        resp.status(500).json(erro);
      });
  });
  app.delete('/api/movimentacoes/:id', function(req, resp) {
    movimentacoesModel.remove({_id: req.params.id})
      .then(function() {
        resp.send();
      }, function(erro) {
        resp.status(500).json(erro);
      });
  });
  app.get('/api/movimentacoes/:id', function(req, resp) {
    movimentacoesModel.findById(req.params.id)
      .then(function(data) {
        resp.json(data);
      }, function(erro) {
        resp.status(500).json(erro);
      });
  });
}