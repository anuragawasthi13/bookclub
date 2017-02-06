import React,{Component} from "react";
import {connect} from "react-redux";

import {checkUserLogin} from "./../actions/action";

@connect(null, {checkUserLogin})
class App extends Component {

	componentWillMount(){
		this.props.checkUserLogin();
	}

 	render(){

		return(
			<div className = "wrapper">
				{this.props.children}
			</div>
		);

	}
}

export default App;