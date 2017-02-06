import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from "react-redux";
import Logout from "./Logout";
import Nav from "./../component/Nav";;

function mapStateToProps(state){
  return state;
}
@connect(mapStateToProps)
class AppRoot extends Component {
  constructor(props){
    super(props);
    this.state={}
  }
  render() {
    return (
      <div>
        <h2>React Universal App</h2>
        <Nav user={this.props.user} />
      </div>
    );
  }
}

export default AppRoot;