// para evitar query selector injection utilizo o sanitize. ele retira todos os simbolos
// ele deve ser usado sempre antes de uma atualizacao ou exclusao
// ex: var _id = sanitize(req.params.id)
var sanitize = require('mongo-sanitize') 

module.exports = function(app) {

    var Cliente = app.models.cliente;

    var controller = {};

    controller.listaClientes = function(req, res){
    	// mpromisse, default do mongoose foi descontinuado. precisamos alterar para o q
        Cliente.find().exec()
	        .then(function(cliente){
	        	res.json(cliente);
	        },
	        function(erro){
	        	console.log(erro);
	        	res.status(500).json(erro);
	        }
        );
    };

    // cadastra ou atualiza
    controller.salvaCliente = function(req, res){


        var _id = req.body._id;

        // fazendo dessa forma evitamos o document replace
        var dados = {
            "nome" : req.body.nome,
            "telefone" : req.body.telefone,
        };

        if(_id){
            Cliente.findByIdAndUpdate(_id, dados).exec()
                .then(
                    function(cliente){
                        res.json(cliente);
                    },
                    function(erro){
                        console.error(erro);
                        res.status(500).json(erro);
                    }
                );
        }else{

            Cliente.create(dados)
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
    }

    return controller;
};
