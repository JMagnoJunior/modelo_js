import React from "react"

export default class ExemploDetalheCliente extends React.Component{
	constructor(){
		super();
		this.state = {};
	}

	render(){
		return(
			<div class="container">			
			    <a href="http://localhost:3000/auth/facebook">
			     <h1>Entre pelo Facebook</h1>
			    </a>
			</div>
		)
	}
}
