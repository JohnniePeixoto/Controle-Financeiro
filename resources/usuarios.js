var mongoose = require('mongoose');

var usuarioModel = mongoose.model('usuarios');
var parseParams = require('../utils/parse-params');

module.exports = function(app) {
  app.get('/api/usuarios', function(req, resp) {
    usuarioModel.find().then(function(usuario){
      resp.json(usuario);
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
  
  app.get('/api/usuarios/:id', function(req, resp) {
    usuarioModel.findById(req.params.id).then(function(usuario) {
        if( !usuario.saldo ) usuario.saldo = 0.0;
        resp.json(usuario);
      }, function(erro) {
        resp.status(500).json(erro);
      });
  });

  app.delete('/api/usuarios/:id', function(req, resp) {
    var usuarioId = req.params.id;
    // var agendamentosModel  = mongoose.model('agendamentos');
    var movimentacoesModel = mongoose.model('movimentacoes');
    var categoriasModel    = mongoose.model('categorias');

    // agendendamentosModel.remove({i_usuario: usuarioId});
    movimentacoesModel.remove({i_usuario: usuarioId});
    categoriasModel.remove({i_usuario: usuarioId});

    usuarioModel.remove({_id: usuarioId})
      .then(function() {
        resp.send();
      }, function(erro) {
        resp.status(500).json(erro);
      });
  });
}