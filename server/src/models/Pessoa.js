var mongoose = require('mongoose');
// var findOrCreate = require('findorcreate-promise')

// este modulo retorna uma collection  do banco que utiliza o schema definido.
module.exports = function() {

    var schema = mongoose.Schema({
      identificador_pessoal: {
        type: String,
        required: true
      }
    });

    schema.statics.entraNaFila = function(identificador_pessoal){
      return this.findOne({"identificador_pessoal": identificador_pessoal}).exec().then(function(result){
        if(!result){
          var instance = new Pessoa();
          instance.identificador_pessoal = identificador_pessoal   
          return instance.save()
        }else{          
          return result
        }
      })
    }

    
  
    var Pessoa =  mongoose.model('Pessoa', schema);
  
    // Pessoa.queryoradd = {}
    // Pessoa._foiEncontrada = function(result){
    //   if(!result){
    //     return false
    //   }
    //   if(typeof result !== null && result.length > 0){
    //     return true
    //   }else{
    //     return false
    //   }
    // }
    // Pessoa.queryoradd.porIdentificadorPessoal = function(id_pessoal, sucesso, error){
      
    //   Pessoa.findOne({"identificador_pessoal" : id_pessoal}).exec()
    //     .then(function(result){
          
    //       if(Pessoa._foiEncontrada(result)){            
    //         sucesso(result)
    //       }else{
    //         Pessoa.create({'identificador_pessoal': id_pessoal}, function(err,result ){
    //             if(err){throw "erro ao criar pessoa"}
    //             sucesso(result)                
    //         })
    //       }          
    //     })
    //     .catch(function(err){
    //        error(err)
    //     })
        
    // }
    return Pessoa;
};
