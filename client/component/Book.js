import React, {Component} from "react";


export default class Book extends Component {
  
  request(){
    
    if(this.props.username){
      this.props.requestBook(this.props.username, this.props.book);
    } else{
      alert("Please login to request any book.");
    }
    
  }

  render(){
    
    const style1 = {
      backgroundImage: "url("+this.props.book.cover+")",
      backgroundSize: "100% 100%",
      width: "200px",
      height: "200px",
      marginLeft: "25px"
    }

    const style2 = {
      display: "block",
      margin: "20px 5px",
      padding: "5px 10px"
    }

    return(

      <div className = "book">
        <span>{this.props.book.title}</span>
        <div style={style1}></div>
        {this.props.book.owner==this.props.username ? <small style = {style2}>This book is yours</small> : <button onClick={this.request.bind(this)}>Request</button>}
      </div>
    
    );
  }
}