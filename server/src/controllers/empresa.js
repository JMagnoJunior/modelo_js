// para evitar query selector injection utilizo o sanitize. ele retira todos os simbolos
// ele deve ser usado sempre antes de uma atualizacao ou exclusao
// ex: var _id = sanitize(req.params.id)
var sanitize = require('mongo-sanitize') 

module.exports = function(app) {

    var Empresa = app.models.Empresa;
    var Fila = app.models.Fila;

    var controller = {};

    controller.listaEmpresas = function(req, res){
    	// mpromisse, default do mongoose foi descontinuado. precisamos alterar para o q        
        Empresa.query.all()
	        .then(function(empresa){
	        	res.json(empresa);
	        },
	        function(erro){
	        	console.log(erro);
	        	res.status(500).json(erro);
	        }
        );
    };

    controller.listaFilasDaEmpresa = function(req, res){
    	// mpromisse, default do mongoose foi descontinuado. precisamos alterar para o q       
        var id = req.params.id;
        
        Empresa.query.filasDaEmpresa(id) 
	        .then(function(empresa){
                if(!empresa){
                    res.json({});
                }else{
                    res.json(empresa._filas)
                }
	        },
	        function(erro){
	        	console.log(erro);
	        	res.status(500).json(erro);
	        }
        );
    };

     controller.criaFilaParaEmpresa = function(req, res){
        
        var id = req.params.id;
        var dados = {
            "nome":  req.body.nome,
            "tipo": req.body.tipo
        };
        Empresa.add.fila(id, dados, function(fila){
            res.status(200).json(fila)
        }, function(error){
            res.status(500).json(error)
        })

    }

    // cadastra ou atualiza
    controller.salvaEmpresa = function(req, res){

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
