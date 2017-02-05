// para evitar query selector injection utilizo o sanitize. ele retira todos os simbolos
// ele deve ser usado sempre antes de uma atualizacao ou exclusao
// ex: var _id = sanitize(req.params.id)
var sanitize = require('mongo-sanitize') 

module.exports = function(app) {

    var Empresa = app.models.Empresa;

    var controller = {};

    controller.listaEmpresas = function(req, res){
    	// mpromisse, default do mongoose foi descontinuado. precisamos alterar para o q
        Empresa.find().exec()
	        .then(function(empresa){
	        	res.json(empresa);
	        },
	        function(erro){
	        	console.log(erro);
	        	res.status(500).json(erro);
	        }
        );
    };

    // cadastra ou atualiza
    controller.salvaEmpresa = function(req, res){

        console.log("aqu aquii")

        console.log(req.body.nome)
        var _id = req.body._id;

        // fazendo dessa forma evitamos o document replace
        var dados = {
            "nome" : req.body.nome,
            "contatos" : req.body.contatos,
            "endereco" : req.body.endereco
        };

        if(_id){
            Empresa.findByIdAndUpdate(_id, dados).exec()
                .then(
                    function(empresa){
                        res.json(empresa);
                    },
                    function(erro){
                        console.error(erro);
                        res.status(500).json(erro);
                    }
                );
        }else{

            Empresa.create(dados)
                .then(
                    function(empresa){
                        res.status(201).json(empresa);
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
