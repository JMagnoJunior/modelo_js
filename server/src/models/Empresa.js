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
      endereco: Endereco,
      _filas: [{
           type: mongoose.Schema.ObjectId, 
           ref: 'Fila'
      }]
    });

    schema.methods.listaFilas = function(){
      that = this
      return new Promise(function(sucess, error){
        
         that.model('Empresa').findOne({"_id": that._id}).populate("_filas").exec(function(err, result){
           
           if(!result){
            error("a empresa não existe")
           }else{
             
            sucess(result._filas)
           }
           
        })
      })
    }

    schema.methods.novaFila = function(fila){
      that = this
      return new Promise(function(sucess, error){
        that.listaFilas().then(function(filas){
          for(f in filas){
            if( filas[f].nome === fila.nome){
              error("fila já cadastrada!")
            }
          }
          that._filas.push(fila) 
          sucess(
            that.save(function(err){
              fila.save()
            })
          );

          
        })

      });
      
     
      // console.log(fila)
      // return this.model('Empresa').update({_id: this.id}, { $set: {"_filas": fila}} )
    }

    var Empresa = mongoose.model('Empresa', schema);


    // Empresa.query = {}
    // Empresa.add = {}

    // Empresa.query.all = function(){
    //    return Empresa.find().exec();
    // }

    // Empresa.query.filasDaEmpresa = function(id){
    //    return Empresa.findById({_id : id}).populate("_filas").exec();
    // }

    // Empresa.add.fila = function(id_empresa, fila, sucess, error){

    // Empresa.query.filasDaEmpresa(id_empresa)
    //     .then(function(empresa){
    //       // verificar se a fila existe para a empresa    
    //       for(f in empresa._filas ){
    //         if(empresa._filas[f].nome === fila.nome.toUpperCase()){
    //           // se existir: retorna error
    //           return error("fila com menos nome já cadastrado na empresa!")
    //         }
    //       }
        
    //       empresa._filas.push(fila);        
    //       empresa.save(function(err, updatedEmpresa){
    //         if(err){ return error("algo errado ao salvar empresa: "+ err) }        
    //         for(f in empresa._filas ){
    //           if(empresa._filas[f].nome === fila.nome.toUpperCase()){
    //             empresa._filas[f].save(function(err, updatedFila){
    //               if(err){ return error("algo errado ao salvar fila: "+ err) }      
    //               return sucess(updatedFila)
    //             })
    //           }
    //         }          
    //       })
    //     })
    //     .catch(err => erro(err))
    // }
    
    return Empresa;
};

