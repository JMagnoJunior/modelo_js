var http = require('http');
var app = require('./config/express')();
var config = require('./config/config')();
require('./config/passport')();
// require('./config/database.js')('mongodb://localhost/exemplo');  // database.js exporta uma funçao que recebe como parametro o local do banco
require('./config/database.js')(config.db); 

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express Server escutando na porta ' + app.get('port'));
});


module.exports = server;