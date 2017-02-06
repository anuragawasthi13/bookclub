import React, {Component} from 'react';
import {connect} from "react-redux";
import {browserHistory} from "react-router";

import { addBooks, getAllMyBooks,deleteBook } from "./../actions/action";

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
    return (
      <div>
        
        <Nav user={this.props.user} />

        <Header heading = {"Mybooks"} />

        <div className = "mybooks">

          <div>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input type="text" onChange={this.handleChange.bind(this)} value={this.state.addbook} />
              <button type="submit">Submit</button>
            </form>
          </div>
          
          <div>
            {this.props.user && this.props.mybooks.length==0 ? <p>You have no books. Add some books.</p> : this.props.mybooks.map((book,i)=><Mybook key={i} delete={this.delete} book={book} />)}
          </div>
          <Logout />

        </div>
          
      </div>  
    );
  }
};
