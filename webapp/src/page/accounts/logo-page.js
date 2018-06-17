import React, { PropTypes } from 'react';
import {TITLE} from '../../config';
import logoImage from '../../assets/images/logo.png';

const LogoPage = (props, { children, theme, pickTheme }) => ({
  	render() {
    	return (
    		<center className="logo">
	            <img src={logoImage} className="logo"/>
	            {TITLE}
	        </center>
   	    );
  	}
});

export default LogoPage;