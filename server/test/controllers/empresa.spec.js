var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should;
var sinon = require('sinon');


describe('loading express', function () {
  var server;
  var Empresa;
  var id_empresa;
  beforeEach(function (done) {
    server = require('../../server');
    Empresa = server._events.request.models.Empresa; 
    prepara_massa_dados(done)
    
  });

   function prepara_massa_dados(done){
        Empresa.remove().then(function(){
             Empresa.create({"nome" : "teste"}, function(err){done(err)})
        })
       
      }

  afterEach(function () {
    server.close();
  });

  // describe('controller.listaFilasDaEmpresa',function(){
  //   it('GET /empresas/:id/filas - lista todas as filas da empresa', function testSlash(done) {
  //      Empresa.findOne({"nome":"teste"}).then(function(result){
  //         id_empresa = result._id
        
  //         request(server)
  //           .get('/empresas/'+id_empresa+'/filas')
  //           .end(function(err, response) {
  //               if (err) { return done(err); }
  //               console.log(response.text)
  //               done();

  //           });
  //       })
  // });
  // });

});