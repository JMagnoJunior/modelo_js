/* 
Mongoose é uma camada de abstraçao para o driver MongoDB nativo.
Facilita a criaçao e validaçao de esquemas na aplicaçao (já que nao existe esquema no banco e essa é a proposta do nosql)
*/
var mongoose = require('mongoose');

module.exports = function(uri) {

    // essa configuracao deve mudar para ambiente de PRODUCAO
    mongoose.set('debug',true);

    // para conectar em varios bancos, ver: mongoose.createConnection(uri)
    // por padrao o mongoose cria um pool com 5 conexoes. Aqui alterei para 15
    mongoose.connect(uri,{ server: { poolSize: 15 }});

    mongoose.connection.on('connected', function() {
      console.log('Mongoose! Conectado em ' + uri);
    });

    mongoose.connection.on('disconnected', function() {
      console.log('Mongoose! Desconectado de ' + uri);
    });

    mongoose.connection.on('error', function(erro) {
      console.log('Mongoose! Erro na conexão: ' + erro);
    });

    process.on('SIGINT', function() {
      mongoose.connection.close(function() {
        console.log('Mongoose! Desconectado pelo término da aplicação');
        // 0 indica que a finalização ocorreu sem erros
        process.exit(0);
      });
    });
}
