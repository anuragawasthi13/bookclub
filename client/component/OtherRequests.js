import React, {Component} from "react";
import {Link} from "react-router";

export default class OtherRequests extends Component{

	render(){

		const style1 = {
			width: "84%",
			margin: "20px 8% 20px 8%",
			padding: "10px 20px 20px 20px",
			backgroundColor: "#fff",
			border: "1px solid #999"

		}

		const style2 = {
			display : "block"
		}

		const style3 = {
			float: "left"
		}

		const style4 = {
			float: "right",
			margin: "0",
			padding: "1px 5px",
			fontSize: "10px"
		}

		const style5 = {
			float: "left",
			width: "40%"
		}

		const style6 = {
			width: "100%"
		}


		return(
			<div style = {style1}>
				<h3>Books requested from you</h3>

				{this.props.requests.length == 0 && <span>You have no book requests.</span>}

				{this.props.requests.map((request,i)=> 
					<div key={i} style= {style6}>
						<div style = {style5}> 
							<span style={style3}>{request.book.title} requested from <Link to = {{ pathname: "/user/" + request.requestor }}>{request.requestor}</Link></span>
						</div>
						
						<div style = {style5}>	
							<small>Status</small><span style={{marginLeft: "10px"}}>{request.granted ? "Accepted" : "Not Accepted"}</span>
						</div>
						{!request.granted && <button style={style4} onClick = {this.props.acceptRequest.bind(this, request._id)}>Accept</button>}
						<div class="spacer" style={{clear: "both"}}></div>
					</div>
				)}

			</div>
		);
	}
} 