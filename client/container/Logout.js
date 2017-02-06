import React,{Component} from "react";
import {connect} from "react-redux";
import {logoutAction} from "./../actions/action";
import {browserHistory} from "react-router";

@connect(null,{logoutAction})
export default class Logout extends Component{
  handleLogout(){
    this.props.logoutAction();
    browserHistory.push("/login");
  }
  render(){
    return(
      <div style={{position:"absolute",top:"50px",right:"50px"}}>
        <button onClick={this.handleLogout.bind(this)}><h3>Logout</h3></button>
      </div>
    );
  }
}