var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should;
var sinon = require('sinon');

describe('Model Pessoa', function () {
    var server;
    var Pessoa;
    
    beforeEach(function () {
        server = require('../../server');
        Pessoa = server._events.request.models.Pessoa; 
        prepara_banco(server);
    });

    afterEach(function () {
        server.close();
    });

    it('deve retornar ou, se nao existir, adicionar uma Pessoa por identificador pessoal', function porIdentificadorPessoal(done) {
       // criando pessoa que nao existe
       Pessoa.findOne({"identificador_pessoal": "123"}).then(function(result){
           console.log("dadada")
            expect(result).to.equal("dada")
            console.log("nahh")
       }).catch(function(err){ console.log( err) })

       Pessoa.queryoradd.porIdentificadorPessoal("123", 
            function(pessoa){
                expect(pessoa.identificador_pessoal,"123")
                done();
                
            }, function(error){
                
                done();
            }
        )
        
    });


});

function prepara_banco(server){
    
    Pessoa.remove({}, function(err){})

    Pessoa.create({"identificador_pessoal": "existente"}).then(function(cliente){

    })

}