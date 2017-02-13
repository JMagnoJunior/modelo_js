/*
process.env contem as variaveis de ambiente do sistema.
Com essa configuraçao, se a var ambiente NODE_ENV for producao, iremos carregar o arquivo:
./env/process.env.PRODUCAO.js. O mesmo vale para os demais ambientes.

Os arquivos do diretorio ./env/ também irão conter configuracoes conforme as variaveis amientes de producao, homologacao ou teste
*/
module.exports = function(){
	if(process.env.NODE_ENV ){
		
    	return require('./env/'+ process.env.NODE_ENV + '.js')
	}else{
		return require('./env/desenvolvimento.js')
	}
}
