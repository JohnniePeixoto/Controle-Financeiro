module.exports = function(param) {
  var obj = JSON.parse(param || "{}") 

  for (prop in obj) {
    if (typeof obj[prop] === 'string') {
      if ( prop.startsWith("i_") ){
        var mongoose = require('mongoose');
        obj[prop] = mongoose.Types.ObjectId(obj[prop]);
      } else {
        obj[prop] = new RegExp(obj[prop], 'i');
      }
    }
  }

  return obj;
}