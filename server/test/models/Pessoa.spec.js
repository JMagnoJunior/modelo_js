// var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should;
var sinon = require('sinon');
var mongoose = require('mongoose')


describe('model.Pessoa', function () {
    // var server;
    // var Pessoa;

    // before(function () {
    //     server = require('../../server');                
    //     // Pessoa = server._events.request.models.Pessoa; 
    //     // prepara_massa_dados(done);            
    // });

    // after(function () {
    //     server.close();
    // });  

    // function prepara_massa_dados(done){
    //     Pessoa.remove().then(function(){
    //          Pessoa.create({"identificador_pessoal" : "existente"}, function(err){done(err)})
    //     })
    // }

    
   
    describe('Pessoa.entraNaFila - Ao entrar na fila uma nova pessoa deve ser adicionada se nao existir ou os seus dados devem ser recuperados, se existir ', function porIdentificadorPessoal(done) {
    
        it('A pessoa deve ser adicionada se nao existir')      
        it('A mesma pessoa nao pode ser adicionada duas vezes')
        it('Se a pessoa já existir na fila, seus dados serao retornados')
                
    });

 


});