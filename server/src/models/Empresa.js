var mongoose = require('mongoose');

// este modulo retorna uma collection  do banco que utiliza o schema definido.
module.exports = function() {

    var Endereco = mongoose.Schema({
      estado:{
        type: String
      },
      cidade: {
        type: String
      }
    })

    var Contato = mongoose.Schema({
        tipo: {
          type: String,
          required: false
        }, 
        valor: {
          type: String,
          required: false
        }
    })

    var schema = mongoose.Schema({
      nome: {
        type: String,
        required: true
      },
      contatos: [Contato],
      endereco: Endereco

    });

    return mongoose.model('Empresa', schema);
};
