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
            console.log(v)
            console.log(invalid.test(v))
            if(invalid.test(v)){
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

    // Fila.query = {}    
    // Fila.add = {};
    // Fila.query.byId = function(id){          
    //    return Fila.findById({_id: id}).exec()
    // }
    // Fila.query.proximaPosicao = function(fila){
    //   // precisa verificar o tipo de fila ainda. este codigo so serve pra sequencial 
    //   if(fila.posicoes.length < 1){
    //     return 1
    //   }else{
    //     return fila.posicoes.length + 1;
    //   }
    // }
    // Fila.add.posicao = function(pessoa, id_fila, sucesso, erro){

    //     Fila.query.byId(id_fila).then(function(fila){
          
    //       posicao = {"codigo": Fila.query.proximaPosicao(fila), "pessoa": pessoa }
    //       fila.posicoes.push(posicao)
    //       fila.save(function(err, updatedFila){
    //         if(err){ erro(err)}
    //         sucesso(posicao)
    //       })
          
    //     }).catch(function(err){erro(err)})
    // };

    return Fila;
};
