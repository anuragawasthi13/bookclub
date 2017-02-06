import React,{Component} from 'react';
import {browserHistory} from "react-router";
import {connect} from "react-redux";

import Nav from "./../component/Nav";
import MyRequests from "./../component/MyRequests";
import OtherRequests from "./../component/OtherRequests";
import Book from "./../component/Book";
import Header from "./../component/Header";

import {getAllBooks,requestBook, getAlRequests} from "./../actions/action";


function mapStateToProps(state){
  return state;
}

@connect(mapStateToProps,{getAllBooks, requestBook, getAlRequests})
export default class Books extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    //check for current user
    const user = this.props.user;

    //fetch all current books  - should i fetch all books on every time user goes to /books or display from stored state?
    this.props.getAllBooks();

    //if user is logged in, also fetch all the requests
    if(user){
      this.props.getAlRequests(user.username);
    }
    
  }

  render(){
    
    let username=this.props.user ? this.props.user.username : null;
    
    return(

      <div>

        <Nav user={this.props.user} />

        <Header heading = {"Books"}/>

        {this.props.user && <MyRequests requests = {this.props.myrequests} />}

        {this.props.user && <OtherRequests requests = {this.props.otherrequests} />}

        <div className = "books">
          
          {
            this.props.books && this.props.books.length==0 ? 
              <strong>There are no books. Add Some.</strong> : 
              this.props.books.map((book,i)=> <Book key = {i} username = {username} book = {book} requestBook = {this.props.requestBook}/>)
          }

        </div>
      </div>
    )
  }
}