var expect = require('chai').expect;
var should = require('chai').should;
var sinon = require('sinon');
var mongoose = require('mongoose')


describe('model.Empresa', function () {
    var server;
    var Empresa;

    // before(function (done) {
    //     server = require('../../server');                
    //     Empresa = server._events.request.models.Empresa; 
    //     prepara_massa_dados(done);            
    // });

    // after(function () {
    //     server.close();
    // });  

    // function prepara_massa_dados(done){
    //     Empresa.remove().then(function(){
    //          Empresa.create({"nome" : "teste"}, function(err){done(err)})
    //     })
    // }

    describe('Empresa.listaFilas - Deve listar todas as filas da empresa', function porIdentificadorPessoal(done) {
        it('deve retornar a mensagem "a empresa não existe" se for informado um código de empresa inválido')
        it('deve retornar todas as filas da empresa quando houver filas na empresa')
        it('deve retornar um array vazio quando não houver filas na empresa')        
    });

    describe('Empresa.novaFila - deve adicionar uma nova fila para a empresa', function porIdentificadorPessoal(done) {
        it('deve adicionar uma nova fila para empresa')        
        it('deve exibir a mensagem "fila já cadastrada" quando for tentado adicionar uma fila com o mesmo nome de uma existente')
        it('deve exibir a mensagem "nome inválido" se o nome da fila tiver espaço)')
        it('deve exibir a mensagem "nome inválido" se o nome da fila tiver mais de 10 caracteres)')        
    });



});