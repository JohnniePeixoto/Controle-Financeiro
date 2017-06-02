var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var _model = new Schema({
  descricao: { 
    type: String, 
    required: true, 
    unique: true,
    uniqueCaseInsensitive: true
  },
  i_usuario: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios'
  },
  global: Boolean
});

_model.plugin(uniqueValidator, { 
    message: 'Já existe uma categoria \'{VALUE}\' cadastrada'
});

mongoose.model('categorias', _model);