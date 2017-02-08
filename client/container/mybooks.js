import React, {Component} from 'react';
import {connect} from "react-redux";
import {browserHistory} from "react-router";

import { addBooks, getAllMyBooks, deleteBook } from "./../actions/action";

import Logout from "./Logout.js"
import Nav from "./../component/Nav";
import Mybook from "./../component/Mybook.js";
import Header from "./../component/Header";

function mapStateToProps(state){
  return state;
}

@connect(mapStateToProps, {addBooks, getAllMyBooks, deleteBook})
export default class Mybooks extends Component {

  constructor(props){
    super(props);
    this.state={
      addbook:""
    }
  }
  
  delete(id){
    console.log("book delete", id);
    const bookID = id; 
    this.props.deleteBook(bookID);  
  }


  handleChange(e){
    this.setState({
      addbook: e.target.value
    });
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.addBooks(this.state.addbook);
    this.setState({
      addbook:""
    });
  }
  componentDidMount(){
    if(!this.props.user){
      console.log("user is not logged in. redirecting to login");
      browserHistory.push("/login");
    }
    else{
      this.props.getAllMyBooks();
    }
  }

  render(){
    const style1 = {
      width: "60%",
      margin: "20px 20% 30px 20%",
      textAlign: "center",
      border: "1px solid #999",
      padding: "20px"
    }
    return (
      <div>
        
        <Nav user={this.props.user} />

        <Header heading = {"Mybooks"} />

        <div className = "mybooks">

          <div style = {style1}>
            <h4>Add books</h4>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input style = {{width: "50%", minWidth: "300px", maxWidth: "600px"}} type="text" onChange={this.handleChange.bind(this)} value={this.state.addbook} placeholder = "Enter book anme and press enter" />
            </form>
          </div>
          
          <div>
            {this.props.user && this.props.mybooks.length==0 ? <p>You have no books. Add some books.</p> : this.props.mybooks.map((book,i)=><Mybook key={i} delete={this.delete.bind(this)} book={book} />)}
          </div>
          <Logout />

        </div>
          
      </div>  
    );
  }
};
