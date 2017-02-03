/*
modulo utilizado para autenticaçao pelo passport
*/
var mongoose = require('mongoose')
// plugin do mongoose para quando nao achar o recurso informado, criar um novo
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {
    var schema = mongoose.Schema({
        login: {
              type: String,
              required: true,
              index: {
                unique: true
              }
        },
        nome: {
          type: String,
          required: true,
        },
        inclusao: {
          type: Date,
          default: Date.now
        }
  });

  // com o código abaixo pdoemos fazer uso do seguinte metodo:
  // Usuario.findOrCreate({'login': login},{'nome':nome},function(erro, usuario){...})
  schema.plugin(findOrCreate);

  return mongoose.model('Usuario', schema);
};
