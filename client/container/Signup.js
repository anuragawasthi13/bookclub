import React,{Component} from "react";
import {Link, browserHistory} from "react-router";

import Nav from "./../component/Nav";
import Header from "./../component/Header";

export default class Signup extends Component{

  constructor(props){
    super(props);
    this.state={
      username: "",
      password: "",
      name: "",
      city: "",
      state: "",
      err:null
    }
  }
  
  handleChange(e){
    
    this.setState({
      [e.target.name]: e.target.value
    });

  }
  
  handleSubmit(e){
    e.preventDefault();
    const {username, password, name, city, state} = this.state;
    var _this = this;

    if(username==""){
      this.setState({
        err:"Please enter username"
      });
    }
    
    else if(password==""){
      this.setState({
        err:"Please enter password"
      });
    }

    else{
      fetch("/api/signup",{
        headers: {
    				'Accept': 'application/json',
    				'Content-Type': 'application/json'
    			},
    			method: 'POST',
    			body: JSON.stringify(_this.state)
      }).then(response=>response.json()).then(json=>{
        if(json.success){
          browserHistory.push("/login");
        } else{
          _this.setState({
            err:json.msg
          });
        }
      });
    }
  }
  
  render(){
    return(

      <div>

        <Nav user={this.props.user} />

        <Header heading = {"Signup"} />

        <div className = "signup">

        {this.state.err && <span style={{color:"red"}}>{this.state.err}</span>}
          
          <form onSubmit={this.handleSubmit.bind(this)}>

            <input type="text" name="username" onChange={this.handleChange.bind(this)} value={this.state.username} placeholder = "Enter a username" /><br/>
            <input type="text" name="password" onChange={this.handleChange.bind(this)} value={this.state.password} placeholder = "Enter a password" /><br/>
            <input type="text" name="name" onChange={this.handleChange.bind(this)} value={this.state.name} placeholder = "Enter a name(optional)" /><br/>
            <input type="text" name="city" onChange={this.handleChange.bind(this)} value={this.state.city} placeholder = "Enter a city(optional)" /><br/>
            <input type="text" name="state" onChange={this.handleChange.bind(this)} value={this.state.state} placeholder = "Enter a state(optional)" /><br/>
            <button type="submit">Signup</button>&nbsp;<Link to="/login"><button>Login</button></Link>
          
          </form>

        </div>  
      </div>
    
    );
  }
}