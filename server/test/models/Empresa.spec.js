var expect = require('chai').expect;
var should = require('chai').should;
var sinon = require('sinon');
var mongoose = require('mongoose')


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

    describe('Empresa.novaFila - deve adicionar uma nova fila para a empresa', function porIdentificadorPessoal(done) {
        it('deve adicionar uma nova fila para empresa')        
        it('deve exibir a mensagem "fila já cadastrada" quando for tentado adicionar uma fila com o mesmo nome de uma existente')
        it('deve exibir a mensagem "nome inválido" se o nome da fila tiver espaço)')
        it('deve exibir a mensagem "nome inválido" se o nome da fila tiver mais de 10 caracteres)')        
    });



});