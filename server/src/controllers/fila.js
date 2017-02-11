// para evitar query selector injection utilizo o sanitize. ele retira todos os simbolos
// ele deve ser usado sempre antes de uma atualizacao ou exclusao
// ex: var _id = sanitize(req.params.id)
var sanitize = require('mongo-sanitize') 

module.exports = function(app) {

    var Fila = app.models.Fila;

    var controller = {};

    controller.entraNaFila = function(req, res){
        var id_fila = req.params.id_fila;        
        var identificador_pessoal = req.body.identificador_pessoal;
        
        var pessoa = {}
        Pessoa.queryoradd.porIdentificadorPessoal(identificador_pessoal, 
        function(result){
            pessoa = result
            Fila.add.posicao(pessoa, id_fila,function(posicao){

                res.json(posicao)
            }, function(error){
                res.status(500).json(error)
            })

        }, function(error){
            res.status(500).json(error)
        })
        
       
    }
    // controller.listaFilas= function(req, res){
    // 	// mpromisse, default do mongoose foi descontinuado. precisamos alterar para o q
    //     var nome_empresa = req.body.nome_empresa;

    //     Fila.find({"nome_empresa" : nome_empresa}).exec()
	//         .then(function(cliente){
	//         	res.json(cliente);
	//         },
	//         function(erro){
	//         	console.log(erro);
	//         	res.status(500).json(erro);
	//         }
    //     );
    // };

    // cadastra ou atualiza
    // controller.salvaFila = function(req, res){


    //     var _id = req.body._id;

    //     // fazendo dessa forma evitamos o document replace
    //     var dados = {
    //         "nome" : req.body.nome,
    //         "tipo" : req.body.telefone,
    //     };

    //     if(_id){
    //         Fila.findByIdAndUpdate(_id, dados).exec()
    //             .then(
    //                 function(fila){
    //                     res.json(fila);
    //                 },
    //                 function(erro){
    //                     console.error(erro);
    //                     res.status(500).json(erro);
    //                 }
    //             );
    //     }else{
    //         Fila.create(dados)
    //             .then(
    //                 function(fila){
    //                     res.status(201).json(fila);
    //                 },
    //                 function(erro){
    //                     console.log(erro);
    //                     res.status(500).json(erro);
    //                 }
    //             )
    //     }
    // }

    return controller;
};
