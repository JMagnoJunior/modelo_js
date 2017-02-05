var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should;
var sinon = require('sinon');




describe('loading express', function () {
  var server;

  beforeEach(function () {
    server = require('../../server');
    
  
  });

  afterEach(function () {
    server.close();
  });

  it('GET /clientes - lista todos os clientes', function testSlash(done) {
      // prepara os dados
      criar_estrutura_cliente(server)
      // executa 
      request(server)
        .get('/clientes')
        .end(function(err, response) {
            if (err) { return done(err); }
            // valida
            expect(JSON.parse(response.text).nome, dados_teste().nome_cliente);
            done();

        });
  });

  it('404 para endereço inexistente', function testPath(done) {
      request(server)
        .get('/foo/bar')
        .expect(404, done);
  });

});

/* --------------- UTILIDADES ------------------- */
function dados_teste(){
  return{
    "nome_cliente" : "teste"
  }
}

function criar_estrutura_cliente(server){
    var Cliente = server._events.request.models.cliente;
    Cliente.remove({}, function(err){})
    
    Cliente.create({"nome": dados_teste().nome_cliente})
                .then(
                    function(cliente){
                        res.status(201).json(cliente);
                    },
                    function(erro){
                        console.log(erro);
                        res.status(500).json(erro);
                    }
                )
}