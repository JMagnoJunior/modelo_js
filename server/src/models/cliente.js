/* 
Uma das principais funçoes do model é definir os esquemas de armazenamento dos dados.

*/
var mongoose = require('mongoose');

// este modulo retorna uma collection  do banco que utiliza o schema definido.
module.exports = function() {

    var schema = mongoose.Schema({
      nome: {
        type: String,
        required: true
        // ,index:{
        //   unique: true
        // }
      },
      telefone: {
        type: String,
        required: false
      }
    });

    return mongoose.model('Cliente', schema);
};




// var schema = mongoose.Schema({
//   nome: {
//     type: String,
//     required: true
//     // ,index:{
//     //   unique: true
//     // }
//   },
//   telefone: {
//     type: String,
//     required: false
//   }
// });

// var Cliente =  mongoose.model('Cliente', schema);

// export default Cliente;
//ou
// var Cliente = mongoose.model(...)
// module.exports = Cliente;

// como utilizar/compor campos que nao estao persistidos? Usando virtual:
// schema.virtual('fullname').get(function(){ return this.firstname + this.lastname})

// ########## EXEMPLOS ###########

// ### SET  ###
// function toLower (v) {
//   return v.toLowerCase();
// }

// var UserSchema = new Schema({
//   email: { type: String, set: toLower } 
// });

// var User = mongoose.model('User', UserSchema);
// var user = new User({email: 'AVENUE@Q.COM'});

// console.log(user.email); // 'avenue@q.com'

//-----------------

// ### VALIDACOES ###
// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };

// var EmailSchema = new Schema({
//     email: {
//         type: String,
//         trim: true,
//         lowercase: true,
//         unique: true,
//         required: 'Email address is required',
//         validate: [validateEmail, 'Please fill a valid email address'],
//         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
//     }
// });

// Ver REFS para simular joins
// pouplar as referencias usando o populate
// ex: Cliente.find.populate('dependente').exec()