// var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should;
var sinon = require('sinon');

require('../../config/database.js')("mongodb://localhost/querocomprar_test"); 
var mongoose = require('mongoose')

var Pessoa = require('../../src/models/Pessoa')()

describe('model.Pessoa', function () {
    // var server;
    // var Pessoa;

    before(function (done) {
        // server = require('../../server');                
        // Pessoa = server._events.request.models.Pessoa; 
        // prepara_massa_dados(done);

        Pessoa.remove({}).then(function(){
            done()
        })
        
    });

    // after(function () {
    //     server.close();
    // });  

    function prepara_massa_dados(done){
        
    }

    
   
    describe('Pessoa.entraNaFila - Ao enctrar na fila uma nova pessoa deve ser adicionada se nao existir ou os seus dados devem ser recuperados, se existir ', function porIdentificadorPessoal(done) {
       
       beforeEach(function (done) {
            Pessoa.remove({}).then(function(){
                done()
            })            
        });

        it('A pessoa deve ser adicionada se nao existir', function(){
            
            var identificador_pessoal = "909090"
            return Pessoa.entraNaFila(identificador_pessoal).then(function(){                       
                return Pessoa.findOne({"identificador_pessoal": identificador_pessoal}).exec().then(
                                function(result){
                                    expect(identificador_pessoal).to.equal(result.identificador_pessoal) 
                                }
                            )
            })
           
        })      
    

        it('A mesma pessoa nao pode ser adicionada duas vezes',function(){
            var identificador_pessoal = "909090"

            return Pessoa.entraNaFila(identificador_pessoal).then(function(){
                return Pessoa.entraNaFila(identificador_pessoal).then(function(){
                    return Pessoa.find({"identificador_pessoal": identificador_pessoal}).then(
                                function(result){
                                    expect(1).to.equal(result.length)                
                                }
                            )
                })
            })
            
        })
        it('Se a pessoa já existir na fila, seus dados serao retornados', function(){
            var identificador_pessoal = "909090"
            return Pessoa.create({"identificador_pessoal":identificador_pessoal}).then(function(){

                return Pessoa.entraNaFila(identificador_pessoal).then(function(result){
                    expect(identificador_pessoal).to.equal(result.identificador_pessoal)
                })

            });            
        })
                
    });

 


});