import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StrategiesPage from '../page/strategies/strategies-page';
import Services from '../services/services';
import {removeCookieStrategy} from '../config';


class Strategies extends Component {
	constructor(props) {
        super(props);
        this.state = {
            strategiesData: [],
        };
        this.removeCookie = this.removeCookie.bind(this);
    }
    componentDidMount() {
        Services.get_list('strategies').then((res)=>{
            if (res.status === 200) {
                this.setState({strategiesData: res.data})
            }
        })
    }

    removeCookie(){
      removeCookieStrategy();
    }

  	render() {
	    return (
			<div className="container app-container">
      			<StrategiesPage strategiesData={this.state.strategiesData} removeCookie={this.removeCookie}/>
      		</div>
	    )
  	}
}

Strategies.defaultProps = {
  	titlePage: 'Strategies',
};

export default Strategies