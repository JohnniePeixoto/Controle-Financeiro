var mongoose = require('mongoose');

var movimentacoesModel = mongoose.model('movimentacoes');
var usuarioModel = mongoose.model('usuarios');
var parseParams = require('../utils/parse-params');

module.exports = function (app) {

  app.get('/api/movimentacoes', function (req, resp) {
    movimentacoesModel.find(parseParams(req.query.filter), [], { sort: { data: -1 } })
      .populate('i_categorias').then(function (dados) {
        resp.json(dados);
      }, function (erro) {
        resp.status(500).json(erro);
      })
  });

  app.post('/api/movimentacoes', function (req, resp) {
    var movimentacao = req.body;
    var usuarioId = movimentacao.i_usuarios;
    var saldo;

    usuarioModel.findById(usuarioId).then(function (usuario) {
      console.log(usuario);
      var saldo = usuario.saldo;
      if (movimentacao.tipo == 'receita') {
        saldo += movimentacao.valor;
      } else {
        saldo -= movimentacao.valor;
      }
      usuarioModel.findByIdAndUpdate(usuarioId, { saldo: saldo }).then(function () {
        movimentacoesModel.create(movimentacao).then(function (dado) {
          resp.json(dado);
        }, function (erro) {
          resp.status(500).json(erro);
        });
      }, function (erro) {
        resp.status(500).json(erro);
      });
    }, function (erro) {
      resp.status(500).json(erro);
    });
  });

  app.put('/api/movimentacoes/:id', function (req, resp) {
    var movimentacaoId = req.params.id;
    var movimentacao = req.body;
    var usuarioId = movimentacao.i_usuarios;

    movimentacoesModel.findById(movimentacaoId).then(function (old_movimentacao) {
      old_valor = old_movimentacao.valor;
      new_valor = movimentacao.valor;

      if (old_valor != new_valor) {

        usuarioModel.findById(usuarioId).then(function (usuario) {
          var saldo = usuario.saldo;
          var diferenca = old_valor - new_valor;
          var new_saldo;
          if ( movimentacao.tipo == 'despesa' )
            new_saldo = diferenca < 0 ? saldo - Math.abs(diferenca) : saldo + Math.abs(diferenca);
          else
            new_saldo = diferenca > 0 ? saldo - Math.abs(diferenca) : saldo + Math.abs(diferenca);
          
          usuarioModel.findByIdAndUpdate(usuarioId, { saldo: new_saldo }).then(function () { },
            function (erro) {
              resp.status(500).json(erro);
            });
        });
      }

      movimentacoesModel.findByIdAndUpdate(movimentacaoId, movimentacao, { new: true })
        .then(function (data) {
          resp.json(data);
        }, function (erro) {
          resp.status(500).json(erro);
        });
    }, function (erro) {
      resp.status(500).json(erro);
    });
  });

  app.delete('/api/movimentacoes/:id', function (req, resp) {
    var movimentacaoId = req.params.id;

    movimentacoesModel.findById(movimentacaoId).then(function (movimentacao) {
      var usuarioId = movimentacao.i_usuarios;

      usuarioModel.findById(usuarioId).then(function (usuario) {
        var saldo = usuario.saldo;

        saldo = movimentacao.tipo == 'receita' ? saldo - movimentacao.valor : saldo + movimentacao.valor;
        console.log(saldo);
        usuarioModel.findByIdAndUpdate(usuarioId, { saldo: saldo }).then(function () {
          movimentacoesModel.remove({ _id: req.params.id }).then(function(){
              resp.send();
            }, function (erro) {
              resp.status(500).json(erro);
            });
        }), function (erro) {
          resp.status(500).json(erro);
        }
      }), function (erro) {
        resp.status(500).json(erro);
      }
    }, function (erro) {
      resp.status(500).json(erro);
    });
  });

  app.get('/api/movimentacoes/:id', function (req, resp) {
    movimentacoesModel.findById(req.params.id)
      .then(function (data) {
        resp.json(data);
      }, function (erro) {
        resp.status(500).json(erro);
      });
  });
}