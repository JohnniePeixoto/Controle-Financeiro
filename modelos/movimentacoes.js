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

// _model.pre('save', function (next) {
//   var mov = this;
//   var now = new Date();
//   this.dataCadastro = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
//   next();
// })

// _model.post('find', function (next) {
//   console.log(this);
//   this.data = this.data.splice(11);
  // var now = this.data;
  // this.data = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
  // this.dataCadastro = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
  // next();
// })

mongoose.model('movimentacoes', _model);
