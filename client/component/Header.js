import React, {Component} from 'react';
import {Link} from 'react-router';

class Header extends Component {

  render() {

    return (
      
      <div className = "header">
        <span>{this.props.heading}</span>  
      </div>

    );
  }

}

export default Header;