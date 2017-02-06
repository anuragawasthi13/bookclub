import React,{Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {updateInfoAction} from "./../actions/action.js";
import {browserHistory} from "react-router";
import Nav from "./../component/Nav";

function mapStateToProps(state){
  return state;
}

@connect(mapStateToProps, {updateInfoAction})
export default class Settings extends Component{
  constructor(props){
    super(props);
    this.state={
      name: this.props.user.name,
      city: this.props.user.city,
      state: this.props.user.state
      }
  }
  
  handleSubmit(e){
    e.preventDefault();
    const {name, city, state} = this.state;

    if(name === ""){
      this.setState({
        err:"Please enter name"
      });
    }
    else if(city === ""){
      this.setState({
        err:"Please enter your city"
      });
    } else if(state === ""){

      this.setState({
        err:"Please enter your state"
      });

    }
    else{

      this.props.updateInfoAction(this.state);
    
    }
  }
  
  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount(){
    if(!this.props.user){
      console.log("user is already logged in. redirecting to mybooks");
      browserHistory.push("/login");
    }
  }

  render(){
    return(
      <div>
        <Nav user={this.props.user} />

        <h1>Settings</h1>
        
        {this.state.err && <span style={{color:"red"}}>{this.state.err}</span>}
        
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" name="name" onChange={this.handleChange.bind(this)} value={this.state.name} placeholder = "Enter your name" /><br/>
          <input type="text" name="city" onChange={this.handleChange.bind(this)} value={this.state.city} placeholder = "Enter your city" /><br/>
          <input type="text" name="state" onChange={this.handleChange.bind(this)} value={this.state.state} placeholder = "Enter your state" /><br/>
          <button type="submit">Update Information</button>
        </form>

      </div>
    );
  }
}