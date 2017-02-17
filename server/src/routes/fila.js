// function verificaAutenticacao(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.status('401').json('Não autorizado');
//   }
// }

module.exports = function(app) {
  
  var controller = app.controllers.fila;

  // app.route('/filas/:id_fila/posicoes')
  // .post(controller.entraNaFila);

  
};
