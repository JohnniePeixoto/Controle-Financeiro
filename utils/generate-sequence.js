var mongoose = require('mongoose');
var S = require('string');
var Schema = mongoose.Schema;

var _seqSchema = new Schema({
  index: {
    type: String,
    index: { unique: true }
  },
  value: {
    type: Number,
    default: 1
  }
});
var model = mongoose.model('_sequences', _seqSchema);

var MARKER = '/';
var LENGTH = 5;

function generateSequence(index, prefix) {
  var indexValue = index + prefix;

  return model.findOneAndUpdate(
    { index: indexValue },
    { $inc: { value: 1 } },
    { new: true, upsert: true })
    .then(function (newValue) {
      return prefix + MARKER + S(newValue.value).padLeft(LENGTH, '0');
    })
}

module.exports = generateSequence;
