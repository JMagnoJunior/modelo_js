// var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should;
var sinon = require('sinon');
var mongoose = require('mongoose')


describe('model.Pessoa', function () {
    var server;
    var Pessoa;

    
    beforeEach(function (done) {
        server = require('../../server');                
        Pessoa = server._events.request.models.Pessoa; 
        prepara_massa_dados(done);        
    });

    afterEach(function () {
        server.close();
    });
   
    describe('Pessoa.queryoradd.porIdentificadorPessoal deve adicionar uma Pessoa por identificador pessoal quando ela nao existir', function porIdentificadorPessoal(done) {
     
 
        it('a pessoa informada nao deve existir', function(done){        
            Pessoa.find({"identificador_pessoal": "123"}).then(function(result){
                expect(result).to.be.empty
                done()
            }).catch( function(erro){ done(erro) })
        });
      
        it('a pessoa informada deve ser adicionada', function(done){  
            Pessoa.queryoradd.porIdentificadorPessoal("123", 
                    function(pessoa){
                        expect(pessoa.identificador_pessoal).to.equal("123")
                        done();                
                    }, function(error){        
                        done(error);
                    }
                )
        });
        
    });

        describe('Pessoa.queryoradd.porIdentificadorPessoal deve retornar uma Pessoa por identificador pessoal quando ela  existir', function porIdentificadorPessoal(done) {
     
 
        it('a pessoa informada deve existir', function(done){        
            Pessoa.find({"identificador_pessoal": "existente"}).then(function(result){
                expect(result).not.to.be.empty
                done()
            }).catch( function(erro){ done(erro) })
        });
      
        it('a pessoa informada deve ser retornada pelo método sem uma nova adicao', function(done){  
            Pessoa.queryoradd.porIdentificadorPessoal("123", 
                    function(pessoa){
                        expect(pessoa.identificador_pessoal).to.equal("123")
                        done();                
                    }, function(error){        
                        done(error);
                    }
                )
        });

        it('deve continuar existindo somente uma pessoa', function(done){        
            Pessoa.find({"identificador_pessoal": "existente"}).then(function(result){
                expect(result.length).to.equal(1)
                done()
            }).catch( function(erro){ done(erro) })
        });
        
    });

    function prepara_massa_dados(done){
        Pessoa.remove().then(function(){
             Pessoa.create({"identificador_pessoal" : "existente"}, function(err){done(err)})
        })
    }


});