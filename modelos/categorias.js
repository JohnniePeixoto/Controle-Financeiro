var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _model = new Schema({
  descricao: {type: String, required: true},
  i_usuarios: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios'
  },
  global: Boolean
});

mongoose.model('categorias', _model);
