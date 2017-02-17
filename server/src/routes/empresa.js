// function verificaAutenticacao(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.status('401').json('Não autorizado');
//   }
// }

module.exports = function(app) {
  
  var controller = app.controllers.empresa;

  // app.route('/empresas')
  // .get(controller.listaEmpresas)
  // .post(controller.salvaEmpresa);

  // app.route('/empresas/:id/filas')
  // .get(controller.listaFilasDaEmpresa)
  // .post(controller.criaFilaParaEmpresa);
  
};
