var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _model = new Schema({
  tipo: { type: String, required: true},
  valor: { type: Number, required: "O valor é obrigatório"},
  saldoAtual: { type: Number, required: true},
  descricao: String,
  data: { type: Date, default: Date.now },
  dataCadastro: { type: Date, default: Date.now },
  i_categorias: {
    type: Schema.Types.ObjectId,
    ref: 'categorias'
  },
  i_usuarios: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  }
});

mongoose.model('movimentacoes', _model);
