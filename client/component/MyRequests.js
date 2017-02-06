import React, {Component} from "react";

export default class MyRequests extends Component{

	render(){

		const style1 = {
			width: "84%",
			margin: "20px 8% 20px 8%",
			padding: "20px",
			backgroundColor: "#eee"
		}

		const style2 = {
			display : "block"
		}

		return(
			<div style = {style1}>
				<h3>Books requested by you</h3>

				{this.props.requests.length == 0 && <span>You have not requested any books</span>}

				{this.props.requests.map((request,i)=> 
					<span style = {style2} key={i}>{request.book.title} requested from {request.requested}</span>
				)}

			</div>
		);
	}
} 