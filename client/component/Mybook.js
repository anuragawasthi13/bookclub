import React,{Component} from "react";

export default class Mybook extends Component{
  constructor(props){
    super(props);
    this.state={}
  }
  
  render(){
    const style = {
      backgroundImage: "url("+this.props.book.cover+")",
      backgroundSize: "100% 100%",
      width: "200px",
      height: "200px",
      marginLeft: "25px"
    }
    
    return(
      <div className = "book">
        <span>{this.props.book.title}</span>
        <div style={style}></div>
        <button onClick={this.props.delete.bind(this, this.props.book._id)}>Delete</button>
      </div>
    );
  }
}