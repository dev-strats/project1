import React, { PropTypes } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { TITLE_SHORT } from '../../config';

const styles = {
}

const checkActive = (location, lists) => {
	return lists.indexOf(location) >= 0 ? 'active' : '';
}

const url_list = {
  strategies: ['/strategies', '/strategy/:id'],
  search: ['/search'],
  login: ['/login'],
}

const Navbar = (props) => ({
    render() {
        return (
			<div className="navbar navbar-inverse navbar-fixed-top">
		      	<div className="container">
		        	<div className="navbar-header">
		          		<Link to="/" className="navbar-brand">{TITLE_SHORT}</Link>
		          		<button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
		            		<span className="icon-bar"></span>
			            	<span className="icon-bar"></span>
			            	<span className="icon-bar"></span>
		          		</button>
		        	</div>
			        <div className="navbar-collapse collapse" id="navbar-main">
			          	<ul className="nav navbar-nav navbar-right">
			          		<li className={checkActive(props.match.path, url_list.strategies)}><NavLink to='/strategies'>Strategies</NavLink></li>
			          		<li className={checkActive(props.match.path, url_list.search)}><NavLink to='/search'>Search</NavLink></li>
			          		<li className={checkActive(props.match.path, url_list.login)}><NavLink to='/login'>Login</NavLink></li>
			          	</ul>
			        </div>
		      	</div>
		    </div>
		)
    }
});

export default Navbar;
