import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HomePage from '../page/home.js';

class Home extends Component {
	constructor(props) {
        super(props);
    }
  	render() {
	    return (
			<div className="bg-fff home">
                <HomePage />
      		</div>
	    )
  	}
}

Home.defaultProps = {
  	titlePage: 'Home',
};

export default Home