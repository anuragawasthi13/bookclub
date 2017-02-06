import React,{Component} from "react";
import {connect} from "react-redux";
import {Link, browserHistory} from "react-router";

import {loginAction} from "./../actions/action.js";

import Nav from "./../component/Nav";
import Header from "./../component/Header";

function mapStateToProps(state){
  return state;
}

@connect(mapStateToProps, {loginAction})
export default class Login extends Component{

  constructor(props){
    super(props);
    this.state={
      username:"",
      password:"",
      err:null
    }
  }
  
  handleSubmit(e){
    e.preventDefault();
    const {username,password} = this.state;
    var _this = this;

    if(username===""){
      this.setState({
        err:"Please enter username"
      });
    }

    else if(password===""){
      this.setState({
        err:"Please enter password"
      });
    }

    else{
      this.props.loginAction(this.state);
    }
  }
  
  handleChange(e){

    this.setState({
      [e.target.name]: e.target.value
    });

  }

  componentDidMount(){

    if(this.props.user){
      console.log("user is already logged in. redirecting to mybooks");
      browserHistory.push("/mybooks");
    }

  }

  render(){

    return(

      <div>

        <Nav user={this.props.user} />
        
        <Header heading = {"Login"} />

        <div className = "login">

          {this.state.err && <span style={{color:"red"}}>{this.state.err}</span>}
          
          {this.props.wrongAuthentication && <span style={{color:"red"}}>Wrong username or password</span>}
          
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" name="username" onChange={this.handleChange.bind(this)} value={this.state.username} placeholder = "Username" /><br/>
            <input type="text" name="password" onChange={this.handleChange.bind(this)} value={this.state.password} placeholder = "Password" /><br/>
            <button type="submit">Login</button>&nbsp;<Link to="/signup"><button>Signup</button></Link>
          </form>
        
        </div>  
      </div>

    );
  }
}