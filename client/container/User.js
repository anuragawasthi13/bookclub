import React, {Component} from "react";
import {connect} from "react-redux";

import Header from "./../component/Header";
import Nav from "./../component/Nav";
import Book from './../component/Book'

import {getUserInfo,requestBook} from "./../actions/action";

function mapStateToProps(state){
	return {
		user: state.user,
		myrequests: state.myrequests,
		otheruser: state.otheruser
	}
}

@connect(mapStateToProps, {getUserInfo, requestBook})
export default class User extends Component{

	componentDidMount(){
		const username = this.props.params.username;

		this.props.getUserInfo(username);

	}

	render(){

		const style1 = {
			width: "80%",
			margin: "20px 10%",
			border: "1px solid #999",
		}

		const style2 = {
			padding: "20px 30px",
			backgroundColor: "#ddd",
			margin: "10px",
			color: "#fff"
		}
		return(
			<div>
				
				<Header heading = {"User Information"} />

				<Nav user = {this.props.user} />

				<div style = {style1}>
					<div style = {style2}>
						<small style = {{marginRight: "20px"}}>Username</small><span>{this.props.params.username}</span>
					</div>
					<div style = {style2}>

						<small style = {{marginRight: "20px"}}>Name</small><span>{!this.props.otheruser.name ? "Name not provided by user" : this.props.otheruser.name}</span>
					</div>
					<div style = {style2}>

						<small style = {{marginRight: "20px"}}>City</small><span>{!this.props.otheruser.city ? "City not provided by user" : this.props.otheruser.name}</span>
					</div>
					<div style = {style2}>

						<span style = {{marginRight: "20px"}}>State</span><span>{!this.props.otheruser.state ? "Name not provided by user" : this.props.otheruser.state}</span>
					</div>
				</div>

				<div className = "books">
          
					{
					this.props.books && this.props.books.length==0 ? 
					  null : 
					  this.props.otheruser.books.map((book,i)=> {
					  	let disabled = false;

					  	this.props.myrequests.forEach(req=>{
					  		if(req.book.bookId == book.bookId){
					  			console.log("should display");
					  			disabled = true;
					  		}
					  	});
					  	return <Book key = {i} username = {this.props.user.username} book = {book} disabled = {disabled} requestBook = {this.props.requestBook}/>
					  })
					}

				</div>

			</div>
		);
	}
}