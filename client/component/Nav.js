import React, {Component} from 'react';
import {Link} from 'react-router';

class Nav extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className = "navbar">
        <ul>
          <li><Link to="/books"> Books </Link></li>
          {this.props.user && <li><Link to="/mybooks"> Mybooks </Link></li>}
          {!this.props.user && <li><Link to="/login"> Login </Link></li>}
          {this.props.user && <li><Link to = "/setting"> Setting </Link></li>}
          </ul>
      </div>
    );
  }
}

export default Nav;