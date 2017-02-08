import React, {Component} from 'react';
import {Link} from 'react-router';

class Header extends Component {

  render() {

  	const style1 = {
  	width: "100%",
		backgroundColor: "#615B59",
		textAlign: "center",
		padding: "150px 20px 70px 20px",
		marginBottom: "20px",
    fontFamily: "'Sansita', sans-serif"
  	}

  	const style2 = {
    	display: "block",
    	color: "white",
  		fontSize: "45px",
  		padding: "20px",
  		textDecoration: "underline"
  	}
    return (
      
      <div style = {style1}>
        <span style = {style2}>{this.props.heading}</span>  
      </div>

    );
  }

}

export default Header;