import React from "react"
import ReactDOM from "react-dom"

import Exemplo from "./componentes/Exemplo/Exemplo"
import Auth from "./componentes/Infra/Auth/Auth"
import { Router, Route, hashHistory } from 'react-router'

class App extends React.Component{
	constructor(){
		super();
	}

	render() {
		return (
			<div> 
				<h1> Exemplo App</h1>
			  	<Exemplo />
			</div>
		);
	}
	
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/exemplo" component={Exemplo}/>
    <Route path="/auth" component={Auth}/>
  </Router>
), document.getElementById('app'))

// const app = document.getElementById('app');
// ReactDOM.render(<App />, app);

