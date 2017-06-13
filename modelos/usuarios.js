var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _model = new Schema({
  nome: {type: String, required: "O campo nome é obrigatório" },
  login: {type: String, required: "O campo login é obrigatório"},
  senha: {type: String, required: "O campo senha é obrigatório"},
  data_nascimento: { type: Date, min: '1900-01-01' },
  saldo: {type: Number, Default: 0}
});


mongoose.model('usuarios', _model);
