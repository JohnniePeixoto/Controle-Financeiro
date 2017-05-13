var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _model = new Schema({
  nome: { type: String, required: true },
  data_nascimento: { type: Date, min: '1900-01-01' },
  saldo: Number
});

mongoose.model('usuarios', _model);
