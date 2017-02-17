function verificaAutenticacao(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status('401').json('Não autorizado');
  }
}

module.exports = function(app) {
  
  var controller = app.controllers.cliente;

  // app.route('/csr.salvaCliente);
  // .get( verificaAutenticacao, controller.listaClientes)
  // .post( verificaAutenticacao, controller.salvaCliente);
    // .get(verificaAutenticacao, controller.listaClientes)
    // .post(verificaAutenticacao, controller.salvaContato);

  // app.route('/contatos/:id')
  //   .get(verificaAutenticacao, controller.obtemContato)
  //   .delete(verificaAutenticacao, controller.removeContato);



};
