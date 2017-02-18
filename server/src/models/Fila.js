var mongoose = require('mongoose');

var Schema = mongoose.Schema


// este modulo retorna uma collection  do banco que utiliza o schema definido.
module.exports = function() {

    var Posicao = mongoose.Schema({
      codigo: String,
      hora_criacao: {
        type: Date, default: Date.now 
      },
      pessoa: {
          type: Schema.ObjectId, 
          ref: 'Pessoa' 
        }
    });

    var enum_tipo_fila = {
      values: ['aleatoria', 'sequencial'],
      message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
    }

    var schema = mongoose.Schema({
      nome: {
        type: String, 
        uppercase: true,
        required: true,
        validate:{
          validator: function(v){
            var invalid  = /\s/
            var TAMANHO_MAXIMO = 10
            if(invalid.test(v)){
              return false            
            }
            if(v.length >= TAMANHO_MAXIMO){
              return false
            }
          },
          message: "nome inválido"
        }
      },
      tipo: {
        type: String, 
        enum: enum_tipo_fila
      },
      posicoes :[Posicao]
    });

    var Fila =  mongoose.model('Fila', schema);
    
    return Fila;
};
