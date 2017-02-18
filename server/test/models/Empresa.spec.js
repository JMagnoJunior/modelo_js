var chai = require('chai');
var expect = chai.expect;
var should = require('chai').should;
var sinon = require('sinon');
var mongoose = require('mongoose')
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);


require('../../config/database.js')("mongodb://localhost/querocomprar_test"); 
var mongoose = require('mongoose')

var Empresa = require('../../src/models/Empresa')()
var Fila = require('../../src/models/Fila')()

describe('model.Empresa', function () {
    
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

    describe('Empresa.listaFilas - Deve listar todas as filas da empresa', function listaFilas() {
        it('deve retornar a mensagem "a empresa não existe" se for informado um código de empresa inválido', function(){

            var mensagem = "a empresa não existe"
            var empresa = new Empresa()

            empresa._id = 123
            return empresa.listaFilas().then(function(result){
                
            }).catch(function(error){
                expect(mensagem).to.equal(error)
            })
        })
        it('deve retornar todas as filas da empresa quando houver filas na empresa', function(){
            var empresa = new Empresa()
            
            empresa.nome = "Empresa teste"

            var fila1 = new Fila()
            fila1.nome = "TESTE"
            fila1.tipo = "sequencial"

            return fila1.save().then(function(){
                empresa._filas.push(fila1._id)
                return empresa.save().then(function(){

                    return empresa.listaFilas().then(function(result){
                        expect(fila1.nome).to.equal(result[0].nome)
                        expect(fila1.tipo).to.equal(result[0].tipo)
                    })
                })
            })

        })
        it('deve retornar um array vazio quando não houver filas na empresa', function(){
            var empresa = new Empresa()
            
            empresa.nome = "Empresa teste"
            return empresa.save().then(function(){
                return empresa.listaFilas().then(function(result){
                    expect(result).to.be.empty
                })
            });

        })        
    });

    describe('Empresa.novaFila ', function novaFila() {
        it('deve adicionar uma nova fila para empresa', function(){
            var empresa = new Empresa()
            empresa.nome = "Empresa teste"

            var fila1 = new Fila()
            fila1.nome = "TESTE"
            fila1.tipo = "sequencial"

            return empresa.save().then(function(){
                return empresa.novaFila(fila1).then(function(){
                    return empresa.listaFilas().then(function(result){
                        expect(result).to.not.be.empty
                        expect(result[0].nome).to.equal(fila1.nome)
                    })
                })
            })
        })        
        it('deve exibir a mensagem "fila já cadastrada" quando for tentado adicionar uma fila com o mesmo nome de uma existente', function(){
             var empresa = new Empresa()
            empresa.nome = "Empresa teste"

            var fila_teste = new Fila()
            fila_teste.nome = "TESTE"
            fila_teste.tipo = "sequencial"

            var fila_repetida = new Fila()
            fila_repetida.nome = "TESTE"
            fila_repetida.tipo = "sequencial"

            return empresa.save().then(function(){
                return empresa.novaFila(fila_teste).then(function(){
                    return empresa.novaFila(fila_repetida)
                        .then(function(){})
                        .catch(function(error){ 
                            expect(error).to.equal("fila já cadastrada!")
                        })
                });
            });


        })
        it('deve exibir a mensagem "nome inválido" se o nome da fila tiver espaço)', function(){
             var empresa = new Empresa()
            empresa.nome = "Empresa teste"

            var fila_teste = new Fila()
            fila_teste.nome = "TES TE"
            fila_teste.tipo = "sequencial"

            return empresa.save().then(function(){
                return expect(empresa.novaFila(fila_teste)).to.be.rejectedWith("nome inválido")
            })
                // return empresa.novaFila(fila_teste).catch(function(err){
                //     expect(err).to.equal("nome inválido")
                // })
            


        })
        it('deve exibir a mensagem "nome inválido" se o nome da fila tiver mais de 10 caracteres)')        
    });

});